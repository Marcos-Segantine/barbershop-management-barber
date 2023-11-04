import firestore from '@react-native-firebase/firestore';

import {
  getDay,
  getYear,
  getMonth,
  getHour,
} from '../../utils/dateHelper'

import { sendScheduleUidToDB } from './sendScheduleUidToDB';
import { verifySchedulesUid } from './verifySchedulesUid';

import { NewScheduleConfirmationImage } from '../../assets/imgs/NewScheduleConfirmationImage';
import { ScheduleUnavailableNow } from '../../assets/imgs/ScheduleUnavailableNow';
import { handleError } from '../../handlers/handleError';

export const addScheduleWhenDayNotUse = async (
  clientUid,
  scheduleInfo,
  setModalContent,
  navigation,
  setIsLoading,
  setSomethingWrong
) => {

  try {

    const scheduleMonth = getMonth(scheduleInfo, setSomethingWrong);
    const scheduleDay = getDay(scheduleInfo, setSomethingWrong);
    const scheduleHour = getHour(scheduleInfo, setSomethingWrong);
    const scheduleYear = getYear(scheduleInfo, setSomethingWrong)

    const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

    const batch = firestore().batch()

    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(clientUid);

    let unavailableTimesData = (await unavailableTimesRef.get()).data() || {}

    if (!unavailableTimesData[scheduleDay]) {
      unavailableTimesData = {
        [scheduleDay]: {
          [scheduleInfo.professionalUid]:
            firestore.FieldValue.arrayUnion(scheduleInfo.schedule),
        }
      };
    }

    const schedulesByUserDoc = await schedulesByUserRef.get();
    const schedulesByUserData = schedulesByUserDoc.data();

    const dataToUpdateSchedulesByUser = {
      schedules: [...schedulesByUserData.schedules, { ...scheduleInfo }],
    }

    const schedulesMonthData = (await schedulesMonthRef.get()).data();

    const dataToUpdateSchedulesMonth = {
      ...schedulesMonthData,
      [scheduleDay]: {
        [scheduleInfo.professionalUid]: {
          [scheduleHour]: { ...scheduleInfo },
        },
      },
    }

    batch.update(unavailableTimesRef, unavailableTimesData);
    batch.update(schedulesMonthRef, dataToUpdateSchedulesMonth);
    batch.update(schedulesByUserRef, dataToUpdateSchedulesByUser);

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
        navigation.navigate("AddSchedule", { headerText: "Agendar Horário", scheduleToUpdate: null, isToUpdateSchedule: null, isToClearScheduleContext: true });
      }
    })

    setIsLoading(false)

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("addScheduleWhenDayNotUse", message)
  }
};
