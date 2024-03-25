import colors from '@theme/colors';
import moment from 'moment';
import {Box, Checkbox, HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {IAccountItem} from './AccountItem.types';

export default function AccountItem({data, isSelected, ...rest}: IAccountItem) {
  const [containerWidth, setContainerWidth] = React.useState(0);

  return (
    <Pressable
      {...rest}
      my="8px"
      bg="white"
      p="12px"
      borderRadius="8px"
      flexDirection="row"
      alignItems="center"
      w="100%"
      justifyContent="space-between"
      onLayout={event => {
        const {width} = event.nativeEvent.layout;
        setContainerWidth(width);
      }}>
      <VStack w="8%" maxW="30px">
        <Box
          h="18px"
          w="18px"
          rounded="full"
          borderWidth="1px"
          alignItems="center"
          justifyContent="center"
          mr="12px"
          borderColor={colors.gray[3]}>
          <Box
            h="10px"
            w="10px"
            rounded="full"
            bg={isSelected ? colors.primary : colors.bg}
          />
        </Box>
      </VStack>
      <VStack w="90%">
        <Text color={colors.black} fontWeight={700} mb="2px">
          {data?.title}
        </Text>
        <HStack justifyContent="space-between">
          <VStack w="48%">
            <Text color={colors.gray[0]} fontSize="xs" mb="1px">
              Last transection amount
            </Text>
            <Text color={colors.gray[0]} fontSize="xs">
              Transection date
            </Text>
          </VStack>
          <VStack w="48%" alignItems="flex-end">
            <Text
              color={colors.gray[0]}
              fontSize="xs"
              mb="1px"
              fontWeight={500}>
              {data?.amount}
            </Text>
            <Text color={colors.gray[0]} fontSize="xs" fontWeight={500}>
              {moment(data.date).format('ll')}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  );
}
