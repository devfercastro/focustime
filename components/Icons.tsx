import Svg, { Path } from "react-native-svg";

export const ResetIcon = ({
  color = "white",
  width = 18,
  height = 18,
}: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 17" fill="none">
      <Path
        d="M2.56686 5.06028C3.40062 3.62132 4.72891 2.5344 6.30441 2.00191C7.87992 1.46941 9.59525 1.52764 11.131 2.16574C12.6668 2.80384 13.9183 3.97832 14.6526 5.47051C15.3869 6.96269 15.5538 8.67087 15.1224 10.277C14.6909 11.8831 13.6905 13.2777 12.3073 14.2011C10.9242 15.1245 9.25257 15.5137 7.60378 15.2964C5.95499 15.079 4.44138 14.2698 3.34478 13.0196C2.24818 11.7693 1.64333 10.1631 1.64286 8.49999"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.92857 5.07142H2.5V1.64285"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const StartIcon = ({
  color = "white",
  width = 18,
  height = 18,
}: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 17" fill="none">
      <Path
        d="M14.8068 6.51475C15.167 6.70631 15.4683 6.99227 15.6784 7.34199C15.8885 7.69171 15.9995 8.09201 15.9995 8.5C15.9995 8.90799 15.8885 9.30829 15.6784 9.65801C15.4683 10.0077 15.167 10.2937 14.8068 10.4853L5.19775 15.7105C3.6505 16.5528 1.75 15.4578 1.75 13.726V3.27475C1.75 1.54225 3.6505 0.448002 5.19775 1.28875L14.8068 6.51475Z"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
};

export const PauseIcon = ({
  color = "white",
  width = 18,
  height = 18,
}: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        d="M6 16.5C6.91667 16.5 7 15.4464 7 14.4643V5.5C7 4.51786 6.91667 3.5 6 3.5C5.08333 3.5 5 4.51786 5 5.5V10L5 14.5C5 15.4821 5.08333 16.5 6 16.5ZM11 5.53571V10V14.4643C11 15.4464 11.0833 16.5 12 16.5C12.9167 16.5 13 15.4821 13 14.5V5.5C13 4.51786 12.9167 3.5 12 3.5C11.0833 3.5 11 4.55357 11 5.53571Z"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M6 16.5C6.91667 16.5 7 15.4464 7 14.4643V5.5C7 4.51786 6.91667 3.5 6 3.5C5.08333 3.5 5 4.51786 5 5.5V10L5 14.5C5 15.4821 5.08333 16.5 6 16.5ZM11 5.53571V10V14.4643C11 15.4464 11.0833 16.5 12 16.5C12.9167 16.5 13 15.4821 13 14.5V5.5C13 4.51786 12.9167 3.5 12 3.5C11.0833 3.5 11 4.55357 11 5.53571Z"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
};
