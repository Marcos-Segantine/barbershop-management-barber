export const sortByHour = (array, setSomethingWrong) => {
    try {
        if (!!array[0]?.hour) {
            array.sort((a, b) => {
                const hourA = a.hour.split(":");
                const hourB = b.hour.split(":");

                // Extract the hours and minutes and convert them to integers.
                const hourAInt = parseInt(hourA[0], 10);
                const minuteAInt = parseInt(hourA[1], 10);
                const hourBInt = parseInt(hourB[0], 10);
                const minuteBInt = parseInt(hourB[1], 10);

                // Compare hours and minutes for sorting.
                if (hourAInt < hourBInt) {
                    return -1;
                } else if (hourAInt > hourBInt) {
                    return 1;
                } else {
                    // If hours are the same, compare minutes.
                    if (minuteAInt < minuteBInt) {
                        return -1;
                    } else if (minuteAInt > minuteBInt) {
                        return 1;
                    } else {
                        return 0; // Hours and minutes are equal.
                    }
                }
            });

            return array;
        }
        else {
            array.sort((a, b) => {
                const [hourA, minuteA] = a.split(":").map(Number);
                const [hourB, minuteB] = b.split(":").map(Number);

                if (hourA < hourB) {
                    return -1;
                } else if (hourA > hourB) {
                    return 1;
                } else {
                    // If hours are the same, compare minutes.
                    if (minuteA < minuteB) {
                        return -1;
                    } else if (minuteA > minuteB) {
                        return 1;
                    } else {
                        return 0; // Hours and minutes are equal.
                    }
                }
            });

            return array;
        }

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("sortByHour", message)
    }
}