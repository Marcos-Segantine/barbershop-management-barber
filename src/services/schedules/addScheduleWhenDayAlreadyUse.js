import firestore from '@react-native-firebase/firestore';

import {
  getMonth,
  getDay,
  getProfessional,
  getHour,
  getYear,
} from "../../utils/dateHelper"

import { sendScheduleUidToDB } from './sendScheduleUidToDB';
import { verifySchedulesUid } from './verifySchedulesUid';

import { NewScheduleConfirmationImage } from '../../assets/imgs/NewScheduleConfirmationImage';
import { ScheduleUnavailableNow } from '../../assets/imgs/ScheduleUnavailableNow';

export const addScheduleWhenDayAlreadyUse = async (
  clientUid,
  scheduleInfo,
  setModalContent,
  navigation
) => {
  console.log('addScheduleWhenDayAlreadyUse CALLED');

  try {
    const scheduleMonth = getMonth(scheduleInfo);
    const scheduleDay = getDay(scheduleInfo);
    const scheduleHour = getHour(scheduleInfo);
    const scheduleYear = getYear(scheduleInfo)
    const scheduleProfessional = getProfessional(scheduleInfo);

    const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(clientUid);

    const batch = firestore().batch();

    const schedulesMonthData = (await schedulesMonthRef.get({ source: "server" })).data();
    const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()[scheduleDay][scheduleProfessional];
    const schedulesByUserData = (await schedulesByUserRef.get({ source: "server" })).data()

    if (schedulesMonthData[scheduleDay][scheduleProfessional]) {

      const dataToUpdateSchedulesMonth = {
        [`${scheduleDay}.${scheduleProfessional}.${scheduleHour}`]: scheduleInfo,
      }

      const dataToUpdateUnavailableTimes = {
        [scheduleDay]: {
          [scheduleProfessional]:
            [...unavailableTimesData, scheduleHour]
        }
      }

      batch.update(schedulesMonthRef, dataToUpdateSchedulesMonth);
      batch.update(unavailableTimesRef, dataToUpdateUnavailableTimes);

    }
    else {

      const dataToUpdateSchedulesMonth = {
        [scheduleDay]: {
          [scheduleProfessional]: {
            [scheduleHour]: scheduleInfo,
          }
        }
      }

      const dataToUpdateUnavailableTimes = {
        [scheduleDay]: {
          [scheduleProfessional]: [scheduleInfo.schedule],
        }
      }

      batch.set(
        schedulesMonthRef,
        dataToUpdateSchedulesMonth,
        { merge: true },
      );

      batch.set(
        unavailableTimesRef,
        dataToUpdateUnavailableTimes,
        { merge: true },
      );
    }

    const updatedSchedulesByUser = {
      schedules: [...schedulesByUserData.schedules, scheduleInfo],
    };

    batch.update(schedulesByUserRef, updatedSchedulesByUser);

    const canConfirmSchedule = await verifySchedulesUid(nameDocMonth_Year, scheduleInfo.scheduleUid);

    if (canConfirmSchedule) {
      sendScheduleUidToDB(nameDocMonth_Year, scheduleInfo.scheduleUid)
      await batch.commit()

      setModalContent({
        image: <NewScheduleConfirmationImage />,
        mainMessage: "Agendamento Confirmado!",
        message: "Agora é só esperar o dia e comparecer no horário marcado",
        firstButtonText: "Confirmar",
        firstButtonAction: () => {
          navigation.navigate("Home");
        }
      })

      return
    }

    setModalContent({
      image: <ScheduleUnavailableNow width={300} height={300} />,
      mainMessage: "Opa!!, espera um pouco",
      message: "Infelizmente alguém acabou de fazer um agendamento no mesmo horário e dia do que voc. Você terá que refazer o processo.",
      firstButtonText: "Entendi",
      firstButtonAction: () => {
        navigation.navigate("NewSchedule", { headerText: "Agendar Horário", scheduleToUpdate: null, isToUpdateSchedule: null });
      }
    })

  } catch (error) {
    console.error(error);
  }
};
