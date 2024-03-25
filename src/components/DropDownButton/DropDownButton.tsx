import {DownArrow} from '@assets/svg/icons';
import colors from '@theme/colors';
import {Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {IDropDownButton} from './DropDownButton.types';

export default function DropDownButton({
  value,
  placeholder,
  title,
  error,
  touched,
  icon = <DownArrow />,
  disabled,
  textProps = {},
  ...rest
}: IDropDownButton) {
  return (
    <VStack space={1}>
      <Text color={colors.black} fontWeight={700} fontSize={'md'} variant="h2">
        {title}
      </Text>
      <Pressable
        mt="2"
        bg={colors.white}
        disabled={disabled}
        justifyContent="space-between"
        alignItems="center"
        borderRadius="8px"
        px="15px"
        py="16px"
        flexDirection="row"
        {...rest}>
        <Text
          color={colors.gray[0]}
          fontSize="md"
          textTransform="capitalize"
          {...textProps}>
          {value ? value : placeholder}
        </Text>
        {icon}
      </Pressable>
      {touched && error ? (
        <Text color={'red.500'} fontSize="sm">
          {error}
        </Text>
      ) : null}
    </VStack>
  );
}
