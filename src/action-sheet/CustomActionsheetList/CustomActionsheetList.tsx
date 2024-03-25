import DropDownButton from '@components/DropDownButton/DropDownButton';
import colors from '@theme/colors';
import {Actionsheet, HStack, Text, VStack, useDisclose} from 'native-base';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {ICustomActionSheet} from './CustomActionsheetList.type';
import {Dimensions} from 'react-native';

export default function CustomActionsheetList({
  value,
  placeholder,
  title,
  error,
  touched,
  items = [],
  label,
  onChange,
  isDisabled,
  onPress,
  fieldValue,
}: ICustomActionSheet) {
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <>
      <DropDownButton
        borderWidth={touched && error ? 1 : undefined}
        borderColor={touched && error ? 'red.500' : undefined}
        error={error}
        touched={touched}
        placeholder={fieldValue ? fieldValue : placeholder}
        onPress={onPress ?? onOpen}
        title={title}
        value={items?.find(item => item.value === value)?.label ?? label}
        disabled={isDisabled}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content px={0} width={Dimensions.get('window').width}>
          <Text fontSize="md" fontWeight="bold" textAlign="left">
            {title}
          </Text>

          {items?.map((item, index) => (
            <Actionsheet.Item
              key={index}
              onPress={() => {
                onChange?.(item);
                onClose();
              }}
              _pressed={{
                backgroundColor: 'gray.200',
              }}
              borderBottomWidth={index === items.length - 1 ? 0 : 1}
              borderBottomColor="gray.300">
              <HStack
                key={index}
                width={Dimensions.get('window').width - 30}
                justifyContent="space-between"
                alignItems="center">
                <Text textTransform="capitalize">{item.label}</Text>
                {value === item.value && (
                  <Feather name="check" size={20} color={colors.primary} />
                )}
              </HStack>
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
