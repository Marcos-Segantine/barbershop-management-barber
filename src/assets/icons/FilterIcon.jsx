import Svg, { Path } from "react-native-svg"

export const FilterIcon = ({ width = 24, height = 24 }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="#000"
        >
            <Path d="M13 20v-4.586L20.414 8c.375-.375.586-.884.586-1.415V4a1 1 0 00-1-1H4a1 1 0 00-1 1v2.585c0 .531.211 1.04.586 1.415L11 15.414V22l2-2z" />
        </Svg>
    )
}