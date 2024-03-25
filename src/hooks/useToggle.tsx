import React from 'react';

type TToggle = [boolean, () => void];

export default function useToggle(status: boolean = false): TToggle {
  const [toggle, setToggle] = React.useState(status);
  const toggleHandler = () => {
    setToggle(prev => !prev);
  };



  return [toggle, toggleHandler, setToggle];
}
