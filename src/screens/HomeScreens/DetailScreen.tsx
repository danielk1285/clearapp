import SelectCurrecySheet from '@actionSheets/SelectCurrecySheet';
import CustomInput from '@components/CustomInput/CustomInput';
import DropDownButton from '@components/DropDownButton/DropDownButton';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import useToggle from '@hooks/useToggle';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {useGetConversionRatesQuery} from '@store/apis';
import {
  setFromAmount,
  setFromCurrency,
  setToAmount,
  setToCurrency,
} from '@store/features/addFundSlice';
import formatFinanceNumber from '@utils/formatFinanceNumber';

import colors from '@theme/colors';
import {
  ICurrencyValue,
  ITransectionData,
  ITransectionNavigationParams,
} from '@typedef/common.types';
import {useFormik} from 'formik';
import {Skeleton, Text, VStack} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import asRoute from '../../hoc/asRoute';
import {useRoute} from '@react-navigation/native';
import removeTrailingZero from '@utils/removeTrailingZero';
import {SheetManager} from 'react-native-actions-sheet';

interface IInitialValues {
  firstCurrency: string;
  secondCurrency: string;
}

function DetailScreen() {
  const {data, isLoading} = useGetConversionRatesQuery(undefined);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const route = useRoute();
  const params = route.params as ITransectionNavigationParams;

  const hideSecondCurrency = params.type === 'addFunds';

  const [isFirstOpen, toggleFirstOpen] = useToggle(false);
  const [isSecondOpen, toggleSecondOpen] = useToggle(false);

  const [firstCurrency, setFirstCurrency] = React.useState<
    ICurrencyValue | undefined
  >();
  const [secondCurrency, setSecondCurrency] = React.useState<
    ICurrencyValue | undefined
  >();

  const validationObject = React.useMemo(() => {
    const vObj: any = {};

    vObj.firstCurrency = Yup.string()
    .typeError('Currency must be a number')
    .required('Currency is required')
    .min(1, 'Currency must be greater than 0');

    if (!hideSecondCurrency) {
      vObj.secondCurrency = Yup.string()
      .typeError('Currency must be a number')
      .required('Currency is required')
      .min(1, 'Currency must be greater than 0');
    }
    return vObj;
  }, [hideSecondCurrency]);

  const validationSchema = Yup.object().shape(validationObject);

  const initialValues: IInitialValues = {
    firstCurrency: '',
    secondCurrency: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      dispatch(setFromCurrency(firstCurrency));
      dispatch(setFromAmount(value.firstCurrency));
      dispatch(setToCurrency(secondCurrency));
      dispatch(setToAmount(value.secondCurrency));

      const navigationParams: ITransectionData = {
        fromCurrency: firstCurrency,
        fromAmount: value.firstCurrency,
        type: params.type,
      };

      if (!hideSecondCurrency) {
        navigationParams.toCurrency = secondCurrency;
        navigationParams.toAmount = value.secondCurrency;
      }

      navigate('accountListScreen', navigationParams);
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
            formatFinanceNumber(secondCurrencyValue),
          );
        }
  
        setFieldValue('firstCurrency', value.split(',').join(''));
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

        setFieldValue('firstCurrency', formatFinanceNumber(firstCurrencyValue));
      }

      setFieldValue('secondCurrency', value.split(',').join(''));
    },
    [firstCurrency, secondCurrency, setFieldValue, calculateCurrency],
  );

  React.useEffect(() => {
    if (data) {
      const fstCurrency = data.currencies.find(
        item => item.currencyCode === 'USD',
      );

      const sndCurrency = data.currencies.find(
        item => item.currencyCode === 'ILS',
      );

      const secondValue = calculateCurrency(
        '50,000.0000',
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
  }, [data, setFieldValue, calculateCurrency]);

  React.useEffect(() => {
    if (data) {
      const fstCurrency = data.currencies.find(
        item => item.currencyCode === 'USD',
      );

      const sndCurrency = data.currencies.find(
        item => item.currencyCode === 'ILS',
      );

      const secondValue = calculateCurrency(
        '50,000.0000',
        sndCurrency?.conversionRates[fstCurrency?.currencyCode?.toLowerCase()],
      );

      const firstValue = calculateCurrency(
        secondValue.toString(),
        fstCurrency?.conversionRates[sndCurrency?.currencyCode?.toLowerCase()],
      );

      setFieldValue('firstCurrency', formatFinanceNumber(firstValue.toString()));

      setFieldValue('secondCurrency', setFieldValue(secondValue.toString()));

      setFirstCurrency(fstCurrency);

      setSecondCurrency(sndCurrency);
    }
  }, [data, setFieldValue, calculateCurrency]);

  const firsCurrenciesList = React.useMemo(() => {
    return data?.currencies?.filter(
      item =>
        item.currencyCode !== firstCurrency?.currencyCode &&
        item.currencyCode !== secondCurrency?.currencyCode,
    );
  }, [data]);

  // hideSecondCurrency

  return (
    <KeyboardAwareView>
      <Skeleton isLoaded={!isLoading}>
        <VStack bg={colors.bg} flex={1} py={4} space="4" px="5">
          <Text
            textTransform="uppercase"
            fontWeight="700"
            color={colors.black}>
            I AM SENDING
          </Text>
          <DropDownButton
            touched={touched}
            placeholder={'Select Currency'}
            onPress={() => {
              SheetManager.show('firstSheetDetails');
            }}
            title={'Currency'}
            value={firstCurrency?.currencyCode}
            fontWeight={'bold'}
            textProps={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          />
          <CustomInput
            title="Amount"
            placeholder="Amount"
            keyboardType="number-pad"
            onChangeText={onFirstCurrencyChange}
            //onBlur={()=> { const formattedValue = formatFinanceNumber(values.secondCurrency);
            //  setFieldValue('firstCurrency', formattedValue);}}
            error={errors.firstCurrency}
            touched={touched.firstCurrency}
            value={values.firstCurrency}
            pl={0}
            fontWeight={'bold'}
            leftElement={
              <Text fontWeight="bold" mr={0} px={2}>
                {firstCurrency?.currencySymbol}
              </Text>
            }
          />

          {hideSecondCurrency ? null : (
            <>
              <Text
                mt={4}
                textTransform="uppercase"
                fontWeight="700"
                color={colors.black}
                textProps={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                I will receive
              </Text>
              <DropDownButton
                touched={touched}
                placeholder={'Select Currency'}
                onPress={() => {
                  SheetManager.show('secondSheetDetails');
                }}
                title={'Currency'}
                value={secondCurrency?.currencyCode}
              />

              <CustomInput
                title="Amount"
                placeholder="amount"
                keyboardType="number-pad"
                onChangeText={onSecondCurrencyChange}
                error={errors.secondCurrency}
                touched={touched.secondCurrency}
                value={values.secondCurrency}
                pl={0}
                fontWeight={'bold'}
                leftElement={
                  <Text fontWeight="bold" mr={0} px={2}>
                    {firstCurrency?.currencySymbol}
                  </Text>
                }
              />
            </>
          )}
          <VStack mt="10">
            <GradientButton onPress={handleSubmit}>Continue</GradientButton>
          </VStack>
        </VStack>
      </Skeleton>

      <SelectCurrecySheet
        id={'firstSheetDetails'}
        currencies={!hideSecondCurrency ? firsCurrenciesList : data?.currencies}
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

          setFieldValue(
            'secondCurrency',
            removeTrailingZero(secondValue.toString()),
          );
          setFirstCurrency(currency);
          SheetManager.hide('firstSheetDetails');
        }}
        isOpen={isFirstOpen}
        onClose={toggleFirstOpen}
      />

      <SelectCurrecySheet
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
            conversionRate,
          );

          setFieldValue('firstCurrency', removeTrailingZero(firstInputValue));
          setSecondCurrency(currency);
          SheetManager.hide('secondSheetDetails');
        }}
        isOpen={isSecondOpen}
        onClose={toggleSecondOpen}
        id={'secondSheetDetails'}
      />
    </KeyboardAwareView>
  );
}

const detailsScreen = asRoute(DetailScreen, 'detailsScreen', {
  title: 'Details',
});

export default detailsScreen;
