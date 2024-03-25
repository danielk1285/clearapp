import {Actionsheet, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {IActionsheetModal} from './ActionsheetModal.types';
//import colors from '@theme/colors'; Fix: Not used

export default function ActionsheetModal({
  children,
  ...rest
}: IActionsheetModal) {
  return (
    <Actionsheet
      {...rest}
      _backdrop={{
        opacity: 0,
      }}>
      <Actionsheet.Content bg={'#ffffff'} shadow={4}>
        {children}
      </Actionsheet.Content>
    </Actionsheet>
  );
}
