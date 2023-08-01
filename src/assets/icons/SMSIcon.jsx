import { Circle, Path, Svg } from "react-native-svg"

export const SMSIcon = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="#fc9501"
        >
            <Circle cx={9.5} cy={9.5} r={1.5} />
            <Circle cx={14.5} cy={9.5} r={1.5} />
            <Path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.897 5.515 5 6.934V22l5.34-4.004C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.671 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
        </Svg>
    )
}