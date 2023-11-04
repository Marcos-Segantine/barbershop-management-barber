import { handleError } from "../../handlers/handleError";
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

        const scheduleMouth = getMonth(scheduleInfo, setSomethingWrong);
        const scheduleDay = getDay(scheduleInfo, setSomethingWrong);
        const scheduleYear = getYear(scheduleInfo, setSomethingWrong)

        const dateForDoc = `${scheduleMouth}_${scheduleYear}`

        const schedulesMonthRef = firestore().collection("schedules_month").doc(dateForDoc)
        const schedulesMonthData = (await schedulesMonthRef.get()).data()

        if (schedulesMonthData === undefined) {
            addScheduleWhenMonthIsNotUse(
                clientUid,
                scheduleInfo,
                setModalContent,
                navigation,
                setIsLoading,
                setSomethingWrong
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
                setIsLoading,
                setSomethingWrong
            )
            : addScheduleWhenDayNotUse(
                clientUid,
                scheduleInfo,
                setModalContent,
                navigation,
                setIsLoading,
                setSomethingWrong
            );

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("confirmNewSchedule", message)
    }
};
