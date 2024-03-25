import React, {useState} from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {VStack, Text, useDisclose, Alert} from 'native-base';
import CurrencyExchangeCard from '@sections/DashBoardSectons/CurrencyExchangeCard/CurrencyExchangeCard';
import SwapBtn from '@components/SwapBtn/SwapBtn';
import useNavigate from '@hooks/useNavigate';
import {currenciesArray} from '@screens/HomeScreens/DashBoardScreen';
import colors from '@theme/colors';
import GradientButton from '@components/GradientButton';
import * as Yup from 'yup';
import ActionsheetModal from '@actionSheets/ActionsheetModal/ActionsheetModal';
import CountrySelectModal from '@actionSheets/ActionsheetModal/CountrySelectModal';
import {useFormik} from 'formik';
import {useRoute} from '@react-navigation/native';
import {ICurrencyValue, IExchangeRequest} from '@typedef/common.types';
import useToggle from '@hooks/useToggle';
import removeTrailingZero from '@utils/removeTrailingZero';
import SelectCurrecySheet from '@actionSheets/SelectCurrecySheet';
import {SheetManager} from 'react-native-actions-sheet';
import {useGetConversionRatesQuery} from '@store/apis';
import {useDispatch, useSelector} from 'react-redux';
import {selectHasViewedTutorials} from '@store/features/ui';
import {useLazyHasSufficientFundsQuery} from '@store/apis/walletsApi';

export interface CurrencyValue {
  currency: string;
  flag: string;
  conversionRates: {
    from: number;
    to: number;
  };
  currencyString: string;
  country: string;
}

interface IInitialValues {
  firstCurrency: string;
  secondCurrency: string;
}

function ExchangeScreen() {
  const navigate = useNavigate();
  const route = useRoute();

  const params = route.params as {
    currency: ICurrencyValue;
  };

  const [isFirstOpen, toggleFirstOpen] = useToggle(false);
  const [isSecondOpen, toggleSecondOpen] = useToggle(false);

  const {data, isLoading} = useGetConversionRatesQuery(undefined);
  const [checkHasSufficientFund] = useLazyHasSufficientFundsQuery();

  const [firstCurrency, setFirstCurrency] = React.useState<
    ICurrencyValue | undefined
  >();

  const [secondCurrency, setSecondCurrency] = React.useState<
    ICurrencyValue | undefined
  >();

  const validationSchema = Yup.object().shape({
    firstCurrency: Yup.number()
      .typeError('Currency must be a number')
      .required('Currency is required')
      .min(1, 'Currency must be greater than 0'),
    secondCurrency: Yup.number()
      .typeError('Currency must be a number')
      .required('Currency is required')
      .min(1, 'Currency must be greater than 0'),
  });

  const initialValues: IInitialValues = {
    firstCurrency: '',
    secondCurrency: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      const transferData: IExchangeRequest = {
        currencyFrom: firstCurrency?.currencyCode as any,
        currencyTo: secondCurrency?.currencyCode as any,
        amountToSend: Number(value.firstCurrency),
        amountConverted: Number(value.secondCurrency),
        amountReceived: Number(value.secondCurrency),
        conversionRate: 1,//Fix This
        action: 'Exchange',
      };
      const hasSufficientFund = await checkHasSufficientFund({
        fromCurrency: firstCurrency?.currencyCode as any,
        fromAmount: Number(value.firstCurrency),
      }).unwrap();
      if (hasSufficientFund) {
        navigate('exchangeOptionScreen', transferData);
      } else {
        Alert.alert(
          'Insufficient Funds',
          'You do not have sufficient funds to complete this transaction',
        );
      }
    },
    validationSchema,
  });

  const {values, errors, touched, setFieldValue, handleSubmit} = formik;

  const calculateCurrency = React.useCallback(
    (value: string, nextCurrency: string) => {
      const floatValue = parseFloat(value.replace(/,/g, ''));
      let secondCurrencyValue = Number(floatValue) / parseFloat(nextCurrency);
      return secondCurrencyValue.toFixed(2) + '';
    },
    [],
  );

  const onFirstCurrencyChange = React.useCallback(
    (value: string) => {
      if (secondCurrency?.currencyCode && firstCurrency?.currencyCode) {
        const secondCurrencyConversionRates =
          secondCurrency?.conversionRates[
            firstCurrency?.currencyCode?.toLowerCase()
          ];

        const secondCurrencyValue = calculateCurrency(
          value,
          secondCurrencyConversionRates,
        );

        setFieldValue(
          'secondCurrency',
          removeTrailingZero(secondCurrencyValue),
        );
      }

      setFieldValue('firstCurrency', removeTrailingZero(value));
    },
    [firstCurrency, secondCurrency, setFieldValue, calculateCurrency],
  );

  const onSecondCurrencyChange = React.useCallback(
    (value: string) => {
      if (secondCurrency?.currencyCode && firstCurrency?.currencyCode) {
        const firstCurrencyConversionRates =
          firstCurrency?.conversionRates[
            secondCurrency?.currencyCode?.toLowerCase()
          ];

        const firstCurrencyValue = calculateCurrency(
          value,
          firstCurrencyConversionRates,
        );

        setFieldValue('firstCurrency', removeTrailingZero(firstCurrencyValue));
      }

      setFieldValue('secondCurrency', removeTrailingZero(value));
    },

    [firstCurrency, secondCurrency, setFieldValue, calculateCurrency],
  );

  React.useEffect(() => {
    console.log("ExchangeScreen Running effect, here is the data: ", data);
    if (data) {
      const currency = route.params.currency ?? 'USD';

      const fstCurrency = data.currencies.find(
        item => item.currencyCode === currency,
      );

      const filteredCurrencies = data.currencies.filter(
        item => item.currencyCode !== currency,
      );

      const filteredSecondCurrency = filteredCurrencies?.[0];

      const secndCurrency = data.currencies.find(
        item => item.currencyCode === 'ILS',
      );

      const sndCurrency = currency ? filteredSecondCurrency : secndCurrency;

      const secondValue = calculateCurrency(
        '50,000',
        sndCurrency?.conversionRates[fstCurrency?.currencyCode?.toLowerCase()],
      );

      const firstValue = calculateCurrency(
        secondValue.toString(),
        fstCurrency?.conversionRates[sndCurrency?.currencyCode?.toLowerCase()],
      );

      setFieldValue('firstCurrency', removeTrailingZero(firstValue));

      setFieldValue('secondCurrency', removeTrailingZero(secondValue));

      setFirstCurrency(fstCurrency);

      setSecondCurrency(sndCurrency);
    }
  }, [data, setFieldValue, calculateCurrency, params]);

  const switchCurrency = () => {
    const firstCr = firstCurrency;
    const secondCr = secondCurrency;

    const firstCurrencyValue = formik.values.firstCurrency;
    const secondCurrencyValue = formik.values.secondCurrency;

    console.log({firstCr, secondCr});

    setSecondCurrency(firstCr);
    setFirstCurrency(secondCr);
    formik.setFieldValue('firstCurrency', secondCurrencyValue);
    formik.setFieldValue('secondCurrency', firstCurrencyValue);
  };

  return (
    <KeyboardAwareView>
      <VStack p="20px" space="8">
        <VStack space={6}>
          <VStack space={6}>
            <CurrencyExchangeCard
              borderTopRadius={0}
              onChangeText={onFirstCurrencyChange}
              flag={firstCurrency?.flag}
              currency={`${firstCurrency?.currencySymbol} (${firstCurrency?.currencyCode})`}
              value={values.firstCurrency}
              handleCurrency={() => {}}
              onPress={() => {
                // if (!route?.params?.currency) {
                SheetManager.show('firstSheetOne');
                // }
              }}
              error={errors.firstCurrency}
              touched={touched.firstCurrency}
              currencySymbol={firstCurrency?.currencySymbol}
            />
            <SwapBtn onPress={switchCurrency} />
            <CurrencyExchangeCard
              currencySymbol={firstCurrency?.currencySymbol}
              subTitle="I am sending"
              onChangeText={onSecondCurrencyChange}
              value={values.secondCurrency}
              flag={secondCurrency?.flag}
              currency={
                `${secondCurrency?.currencySymbol} (${secondCurrency?.currencyCode})` ||
                ''
              }
              handleCurrency={() => {
                console.log('second currency');
              }}
              onPress={() => {
                SheetManager.show('secondSheetOne');
              }}
              error={errors.secondCurrency}
              touched={touched.secondCurrency}
            />
          </VStack>
          <Text textAlign={'center'}>
            1 {firstCurrency?.currencyCode} ={' '}
            {secondCurrency?.conversionRates[
              firstCurrency?.currencyCode?.toLowerCase()
            ]?.toFixed(2)}{' '}
            {secondCurrency?.currencyCode} \n Last updated{secondCurrency?.updatedDate}
            \n Updates every 15 seconds
            </Text>
        </VStack>
        <Text textAlign="center" w="90%" color={colors.gray[0]}>
          Our commission is $15 (already deducted) Exchange rate updates every
          15 seconds
        </Text>
        <GradientButton onPress={handleSubmit}>Continue</GradientButton>
      </VStack>

      <SelectCurrecySheet
        id="firstSheetOne"
        currencies={data?.currencies?.filter(
          item =>
            item.currencyCode !== firstCurrency?.currencyCode &&
            item.currencyCode !== secondCurrency?.currencyCode,
        )}
        onSelectCurrency={(currency: ICurrencyValue) => {
          toggleFirstOpen();

          // take the current value of the first currency
          const currentValue = formik.values.firstCurrency;

          // find the conversion rate of the second currency from the currency

          const conversionRate =
            secondCurrency?.conversionRates[
              currency?.currencyCode?.toLowerCase()
            ];

          // calculate the value of the second currency from the first currency

          const secondValue = calculateCurrency(currentValue, conversionRate);

          setFieldValue('secondCurrency', secondValue.toString());
          setFirstCurrency(currency);
          SheetManager.hide('firstSheetOne');
        }}
        isOpen={isFirstOpen}
        onClose={toggleFirstOpen}
      />

      <SelectCurrecySheet
        id="secondSheetOne"
        currencies={data?.currencies?.filter(
          item =>
            item.currencyCode !== secondCurrency?.currencyCode &&
            item.currencyCode !== firstCurrency?.currencyCode,
        )}
        onSelectCurrency={(currency: ICurrencyValue) => {
          toggleSecondOpen();
          // take the current value of the second currency
          const currentValue = formik.values.secondCurrency;

          // find the conversion rate of the first currency from the currency

          const conversionRate =
            firstCurrency?.conversionRates[
              currency?.currencyCode?.toLowerCase()
            ];

          // calculate the value of the first currency from the second currency

          const firstInputValue = calculateCurrency(
            currentValue,
            conversionRate.toString(),
          );

          setFieldValue('firstCurrency', firstInputValue);
          setSecondCurrency(currency);
          SheetManager.hide('secondSheetOne');
        }}
        isOpen={isSecondOpen}
        onClose={toggleSecondOpen}
      />
    </KeyboardAwareView>
  );
}

const exchangeScreen = asRoute(ExchangeScreen, 'exchangeScreen', {
  title: 'Exchange',
});

export default exchangeScreen;
