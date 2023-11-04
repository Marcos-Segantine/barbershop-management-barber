import firestore from '@react-native-firebase/firestore';

import {
  getMonth,
  getDay,
  getHour,
  getYear,
} from "../../utils/dateHelper"

import { sendScheduleUidToDB } from './sendScheduleUidToDB';
import { verifySchedulesUid } from './verifySchedulesUid';

import { NewScheduleConfirmationImage } from '../../assets/imgs/NewScheduleConfirmationImage';
import { ScheduleUnavailableNow } from '../../assets/imgs/ScheduleUnavailableNow';

export const addScheduleWhenMonthIsNotUse = async (
  clientUid,
  scheduleInfo,
  setModalContent,
  navigation,
  setIsLoading
) => {

  try {
    const scheduleMonth = getMonth(scheduleInfo);
    const scheduleHour = getHour(scheduleInfo);
    const scheduleDay = getDay(scheduleInfo);
    const scheduleYear = getYear(scheduleInfo);

    const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

    const batch = firestore().batch();

    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(clientUid);
    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);

    const scheduleMonthData = {
      [scheduleDay]: {
        [scheduleInfo.professionalUid]: {
          [scheduleHour]: { ...scheduleInfo },
        },
      },
    };

    const unavailableTimesData = {
      [scheduleDay]: {
        [scheduleInfo.professionalUid]: [scheduleHour]
      }
    }

    batch.set(schedulesMonthRef, scheduleMonthData);
    batch.set(unavailableTimesRef, unavailableTimesData);
    batch.update(schedulesByUserRef, {
      schedules: firestore.FieldValue.arrayUnion({ ...scheduleInfo }),
    });

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

      setIsLoading(false)

      return
    }

    setModalContent({
      image: <ScheduleUnavailableNow width={300} height={300} />,
      mainMessage: "Opa!!, espera um pouco",
      message: "Infelizmente alguém acabou de fazer um agendamento no mesmo horário e dia do que voc. Você terá que refazer o processo.",
      firstButtonText: "Entendi",
      firstButtonAction: () => {
        navigation.navigate("AddSchedule", { headerText: "Agendar Horário", scheduleToUpdate: null, isToUpdateSchedule: null, isToClearScheduleContext : true });
      }
    })

    setIsLoading(false)

  } catch ({ message }) {
    console.log(error);
  }
};
