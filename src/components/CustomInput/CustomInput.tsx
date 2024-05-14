import colors from '@theme/colors';
import {FormControl, Input, Text, VStack} from 'native-base';
import React from 'react';
import {ICustomInput} from './CustomInput.types';

export default function CustomInput({
  placeholder,
  title = '',
  error,
  touched,
  ...rest
}: ICustomInput) {
  return (
    <FormControl
      isInvalid={touched && error ? true : false} // Set isInvalid based on error and touched
    >
      <VStack space="1">
        {title ? (
          <FormControl.Label
            _text={{color: colors.black, fontSize: 'md', fontWeight: 700}}>
            {title}
          </FormControl.Label>
        ) : null}

        <Input
          {...rest}
          mt="2"
          placeholder={placeholder}
          borderColor={touched && error ? 'red.500' : undefined} // Set border color based on error and touched
        />

        <FormControl.ErrorMessage
          mt="1"
          _text={{color: 'red.500', fontSize: 'sm', fontWeight: 400}}>
          {error}
        </FormControl.ErrorMessage>
      </VStack>
    </FormControl>
  );
}
