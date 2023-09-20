import { getMonth, getDay, getYear } from "../../utils/dateHelper";

import { addScheduleWhenDayAlreadyUse } from "./addScheduleWhenDayAlreadyUse";
import { addScheduleWhenDayNotUse } from "./addScheduleWhenDayNotUse";
import { addScheduleWhenMonthIsNotUse } from "./addScheduleWhenMonthIsNotUse";

import firestore from "@react-native-firebase/firestore";

export const confirmNewSchedule = async (
    scheduleInfo,
    clientUid,
    setModalContent,
    setSomethingWrong,
    navigation,
    setIsLoading
) => {

    try {

        const scheduleMouth = getMonth(scheduleInfo);
        const scheduleDay = getDay(scheduleInfo);
        const scheduleYear = getYear(scheduleInfo)

        const dateForDoc = `${scheduleMouth}_${scheduleYear}`

        const schedulesMonthRef = firestore().collection("schedules_month").doc(dateForDoc)
        const schedulesMonthData = (await schedulesMonthRef.get()).data()

        if (schedulesMonthData === undefined) {
            addScheduleWhenMonthIsNotUse(
                clientUid,
                scheduleInfo,
                setModalContent,
                navigation,
                setIsLoading
            );
            return;
        }

        const dayIsAlreadyUse = schedulesMonthData[scheduleDay]

        dayIsAlreadyUse
            ? addScheduleWhenDayAlreadyUse(
                clientUid,
                scheduleInfo,
                setModalContent,
                navigation,
                setIsLoading
            )
            : addScheduleWhenDayNotUse(
                clientUid,
                scheduleInfo,
                setModalContent,
                navigation,
                setIsLoading
            );

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
};
