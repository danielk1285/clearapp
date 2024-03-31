import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function YouExchangedIcon(props) {
  return (
    <Svg
      width={40}
      height={41}
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect y={0.5} width={40} height={40} rx={8} fill="#fff" />
      <Path
        d="M20 14.06h10"
        stroke="#3A41FE"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.22 10.5h5.56c1.78 0 2.22.44 2.22 2.2v4.11c0 1.76-.44 2.2-2.22 2.2h-5.56c-1.78 0-2.22-.44-2.22-2.2V12.7c0-1.76.44-2.2 2.22-2.2z"
        stroke="#3A41FE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 25.56h10"
        stroke="#3A41FE"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.22 22h5.56c1.78 0 2.22.44 2.22 2.2v4.11c0 1.76-.44 2.2-2.22 2.2h-5.56c-1.78 0-2.22-.44-2.22-2.2V24.2c0-1.76.44-2.2 2.22-2.2zM30 23.5c0 3.87-3.13 7-7 7l1.05-1.75M10 17.5c0-3.87 3.13-7 7-7l-1.05 1.75"
        stroke="#3A41FE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default YouExchangedIcon;
