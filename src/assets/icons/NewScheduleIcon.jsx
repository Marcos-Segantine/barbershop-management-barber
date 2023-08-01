import Svg, { Path } from "react-native-svg"

export const NewScheduleIcon = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="#000"
        >
            <Path d="M3 16c0 1.103.897 2 2 2h3.586L12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v12zM5 4h14v12h-4.414L12 18.586 9.414 16H5V4z" />
            <Path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z" />
        </Svg>
    )
}

export const NewScheduleIconSelected = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="#fc9501"
        >
            <Path d="M3 16c0 1.103.897 2 2 2h3.586L12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v12zM5 4h14v12h-4.414L12 18.586 9.414 16H5V4z" />
            <Path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z" />
        </Svg>
    )
}