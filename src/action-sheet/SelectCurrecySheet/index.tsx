import {ICurrencyValue} from '@typedef/common.types';
import {
  Actionsheet,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useImperativeHandle} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface SelectCurrecySheetProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectCurrency?: (currency: ICurrencyValue) => void;
  selectedCurrency?: ICurrencyValue;
  currencies?: ICurrencyValue[];
  currentCurrency?: ICurrencyValue;
  id?: string;
}

export const SELECT_CURRENCY_SHEET = 'selectCurrency';
const SELECT_CURRENCY_SHEET_HEIGHT = Dimensions.get('window').height/2;

const SelectCurrecySheet = (
  {
    onSelectCurrency,
    selectedCurrency,
    currencies = [],
    id,
  }: SelectCurrecySheetProps,
  ref: React.Ref<ActionSheet>,
) => {
  const sheetRef = React.useRef<ActionSheet>(null);

  const handleSelectCurrency = (currency: ICurrencyValue) => {
    onSelectCurrency?.(currency);
    SheetManager.hide('currencySheet');
  };

  useImperativeHandle(sheetRef, () => ({
    show: () => {
      sheetRef.current?.show();
    },
    hide: () => {
      sheetRef.current?.hide();
    },
  }));
  const {top} = useSafeAreaInsets();

  return (
    <ActionSheet ref={sheetRef} id={id} gestureEnabled>
      <>
        <VStack
          w="full"
          style={[
            styles.container,
            {
              paddingTop: top,
            },
          ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack>
              {currencies.map(currency => (
                <Pressable
                  key={currency.currencyCode}
                  _pressed={{
                    backgroundColor: '#f7f7f7',
                  }}
                  backgroundColor={
                    selectedCurrency?.currencyCode === currency.currencyCode
                      ? '#f7f'
                      : undefined
                  }
                  onPress={() => handleSelectCurrency(currency)}
                  px="4">
                  <HStack py="3" alignItems="center" space="2">
                    <HStack alignItems="center" space="2">
                      <Image
                        source={{uri: currency.flag}}
                        alt={currency.currencyCode}
                        size={8}
                      />

                      <Text>{currency.currencyName}</Text>
                      <Text>
                        {'('}
                        {currency.currencyCode}
                        {')'}
                      </Text>
                    </HStack>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        </VStack>
      </>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SELECT_CURRENCY_SHEET_HEIGHT,
    backgroundColor: '#fff',
  },
});

export default React.forwardRef(SelectCurrecySheet);
