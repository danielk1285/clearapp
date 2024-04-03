import {Pencil} from '@assets/svg/icons';
import Card from '@components/Card/Card';
import SectionTitleDescription from '@layouts/SectionTitleDescription/SectionTitleDescription';
import colors from '@theme/colors';
import {HStack, Input, Pressable, Text, VStack} from 'native-base';
import React, {useRef} from 'react';
import {ICurrencyExchangeCardProps} from './CurrencyExchangeCard.types';
import SelectCurrencyBtn from './SelectCurrencyBtn';

function CurrencyExchangeCard({
  title = '',
  onPress,
  currency,
  flag,
  subTitle = 'I need',
  inputProps,
  error,
  touched,
  onChangeText,
  value,
  onBlur,
  currencySymbol,
  ...rest
}: ICurrencyExchangeCardProps) {
  const inputRef = useRef();

  return (
    <Card space={4} {...rest}>
      {title ? <SectionTitleDescription title={title} /> : null}
      <VStack pb={4}>
        <Text color={colors.gray[0]} fontSize="md" fontWeight={400}>
          {subTitle}
        </Text>
        <HStack alignItems="center" justifyContent="space-between">
          <VStack width={'50%'}>
            <Input
              ref={inputRef}
              placeholder="0"
              color={colors.black}
              width={'full'}
              fontSize="lg"
              keyboardType="numeric"
              fontWeight={700}
              borderRadius={0}
              borderWidth={0}
              borderBottomWidth={1}
              leftElement={<Text fontWeight={700}>{currencySymbol}</Text>}
              px={1}
              borderBottomColor={touched && error ? 'red.500' : '#000000'}
              _focus={{
                borderBottomColor: touched && error ? 'red.500' : '#000000',
              }}
              rightElement={
                <Pressable
                  onPress={() => {
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}>
                  <Pencil />
                </Pressable>
              }
              {...inputProps}
              onChangeText={onChangeText}
              value={value}
              onBlur={onBlur}
            />
          </VStack>

          <SelectCurrencyBtn
            onPress={onPress}
            currency={currency}
            // flag={flag}
          />
        </HStack>
        {touched && error ? (
          <Text color={'red.500'} fontSize="sm" mt="2">
            {error}
          </Text>
        ) : null}
      </VStack>
    </Card>
  );
}

export default React.memo(CurrencyExchangeCard);
