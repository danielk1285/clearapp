import SelectCurrecySheet from '@actionSheets/SelectCurrecySheet';
import useToggle from './useToggle';
import React from 'react';

import {useGetConversionRatesQuery} from '../store/apis';
import {ICurrencyValue} from '@typedef/common.types';

const useCurrencyExchange = () => {
  const {data, isLoading} = useGetConversionRatesQuery(undefined);
  const firstSheetRef = React.useRef<any>(null);
  const secondSheetRef = React.useRef<any>(null);



  const [isFirstOpen, toggleFirstOpen] = useToggle(false);
  const [isSecondOpen, toggleSecondOpen] = useToggle(false);

  const [firstCurrency, setFirstCurrency] = React.useState<
    ICurrencyValue | undefined
  >();
  const [secondCurrency, setSecondCurrency] = React.useState<
    ICurrencyValue | undefined
  >();

  const [firstCurrencyValue, setFirstCurrencyValue] = React.useState<
    string | undefined
  >('');

  const [secondCurrencyValue, setSecondCurrencyValue] = React.useState<
    string | undefined
  >('');


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

        const secondCurrencyVal = calculateCurrency(
          value,
          secondCurrencyConversionRates,
        );

        setSecondCurrencyValue(secondCurrencyVal.toString());
      }

      setFirstCurrencyValue(value);
    },
    [
      firstCurrency,
      secondCurrency,
      calculateCurrency,
      setFirstCurrencyValue,
      setSecondCurrencyValue,
    ],
  );

  const onSecondCurrencyChange = React.useCallback(
    (value: string) => {
      if (secondCurrency?.currencyCode && firstCurrency?.currencyCode) {
        const firstCurrencyConversionRates =
          firstCurrency?.conversionRates[
            secondCurrency?.currencyCode?.toLowerCase()
          ];

        const firstCurrencyVal = calculateCurrency(
          value,
          firstCurrencyConversionRates,
        );

        setFirstCurrencyValue(firstCurrencyVal.toString());
      }

      setSecondCurrencyValue(value);
    },

    [
      firstCurrency,
      secondCurrency,
      calculateCurrency,
      setFirstCurrencyValue,
      setSecondCurrencyValue,
    ],
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
        '50,000',
        sndCurrency?.conversionRates[fstCurrency?.currencyCode?.toLowerCase()],
      );

      const firstValue = calculateCurrency(
        secondValue.toString(),
        fstCurrency?.conversionRates[sndCurrency?.currencyCode?.toLowerCase()],
      );

      setFirstCurrencyValue(firstValue.toString());

      setSecondCurrencyValue(secondValue.toString());

      setFirstCurrency(fstCurrency);

      setSecondCurrency(sndCurrency);
    }
  }, [data, calculateCurrency, setFirstCurrency, setSecondCurrency]);

  const switchCurrency = () => {
    const firstCr = firstCurrency;
    const secondCr = secondCurrency;

    const firstCurrencyVal = firstCurrencyValue;
    const secondCurrencyVal = secondCurrencyValue;

    console.log({firstCr, secondCr});

    setSecondCurrency(firstCr);
    setFirstCurrency(secondCr);
    setFirstCurrencyValue(secondCurrencyVal);
    setSecondCurrencyValue(firstCurrencyVal);
  };

  const CurrencyActionSheets = React.useMemo(() => {
    return (
      <>
        <SelectCurrecySheet
          ref={firstSheetRef}
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

            setSecondCurrencyValue('secondCurrency', secondValue.toString());
            setFirstCurrency(currency);
            firstSheetRef.current?.hide();
          }}
          isOpen={isFirstOpen}
          onClose={toggleFirstOpen}
        />

        <SelectCurrecySheet
          ref={secondSheetRef}
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

            setFirstCurrencyValue(firstInputValue);
            setSecondCurrency(currency);
            secondSheetRef.current?.hide();
          }}
          isOpen={isSecondOpen}
          onClose={toggleSecondOpen}
        />
      </>
    );
  }, [
    data,
    firstCurrency,
    secondCurrency,
    calculateCurrency,
    toggleFirstOpen,
    toggleSecondOpen,
    isFirstOpen,
    isSecondOpen,
  ]);

  return {
    isLoading,
    firstCurrency,
    secondCurrency,
    firstCurrencyValue,
    secondCurrencyValue,
    onFirstCurrencyChange,
    onSecondCurrencyChange,
    switchCurrency,
    CurrencyActionSheets,
    toggleFirstSheetOpen: toggleFirstOpen,
    toggleSecondSheetOpen: toggleSecondOpen,
    isFirstSheetOpen: isFirstOpen,
    isSecondSheetOpen: isSecondOpen,
  };
};

export default useCurrencyExchange;
