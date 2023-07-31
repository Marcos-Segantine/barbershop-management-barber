import Svg, { Path } from "react-native-svg"

export const DayWeek = ({ width = 20, height = 20 }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="#000"
        >
            <Path d="M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7v2H5a2 2 0 00-2 2zm16 14H5V8h14z" />
        </Svg>
    )
}