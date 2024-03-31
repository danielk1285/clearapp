import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function TransferCompleteIcon(props) {
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
        d="M17.5 22.25c0 .97.75 1.75 1.67 1.75h1.88c.8 0 1.45-.68 1.45-1.53 0-.91-.4-1.24-.99-1.45l-3.01-1.05c-.59-.21-.99-.53-.99-1.45 0-.84.65-1.53 1.45-1.53h1.88c.92 0 1.67.78 1.67 1.75M20 16v9"
        stroke="#3A41FE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M30 20.5c0 5.52-4.48 10-10 10s-10-4.48-10-10 4.48-10 10-10M30 14.5v-4h-4M25 15.5l5-5"
        stroke="#3A41FE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default TransferCompleteIcon;
