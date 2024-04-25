import React from 'react';
import {Actionsheet, HStack, Text, VStack, useDisclose} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {Dimensions, useWindowDimensions} from 'react-native';
import DropDownButton from '@components/DropDownButton/DropDownButton';
import colors from '@theme/colors';

export default function CustomActionsheetList({
  value,
  placeholder,
  title,
  error,
  touched,
  items = [],
  onChange,
  isDisabled,
}) {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {width} = useWindowDimensions(); // Using useWindowDimensions for dynamic sizing

  return (
    <>
      <DropDownButton
        borderWidth={touched && error ? 1 : undefined}
        borderColor={touched && error ? 'red.500' : undefined}
        error={touched && error} // Display error state visually
        touched={touched}
        placeholder={
          value ? items.find(item => item.value === value)?.label : placeholder
        }
        onPress={onOpen}
        title={title}
        value={items.find(item => item.value === value)?.label}
        disabled={isDisabled}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content px={0} width={width}>
          <VStack space={2} px={4} py={3}>
            <Text fontSize="md" fontWeight="bold" textAlign="center">
              {title}
            </Text>
            {error && touched && (
              <Text color="red.500" fontSize="xs" 
              // cewntera
              textAlign="center"
              >
                {error}
              </Text>
            )}
            {items.map((item, index) => (
              <Actionsheet.Item
                key={index}
                onPress={() => {
                  onChange(item);
                  onClose();
                }}
                _pressed={{backgroundColor: 'gray.200'}}
                borderBottomWidth={index === items.length - 1 ? 0 : 1}
                borderBottomColor="gray.300">
                <HStack
                  width={width - 30}
                  justifyContent="space-between"
                  alignItems="center">
                  <Text textTransform="capitalize">{item.label}</Text>
                  {value === item.value && (
                    <Feather name="check" size={20} color={colors.primary} />
                  )}
                </HStack>
              </Actionsheet.Item>
            ))}
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
