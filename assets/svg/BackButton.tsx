import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackButton(props) {
  return (
    <Svg
      width={9}
      height={18}
      viewBox="0 0 9 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8 16.92L1.48 10.4c-.77-.77-.77-2.03 0-2.8L8 1.08"
        stroke="#E9E9E9"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BackButton;
