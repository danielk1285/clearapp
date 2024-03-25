interface ICnversionRates {
  [key: string]: number | string | Date;
  currency: string;
  rate: number;
}

export const getConverstionRate = (
  currencyCode: string,
  conversionRates: ICnversionRates,
) => {
  let rates = Object.keys(conversionRates).map(key => ({
    currency: key.toLowerCase(),
    rate: conversionRates[key],
  }));

  rates = rates.filter(rate => rate.currency.toLowerCase() !== 'updatedat');

  const conversionValue = rates.find(
    rate => rate.currency === currencyCode.toLowerCase(),
  );

  if (conversionValue) {
    rates = rates.map(rate => ({
      ...rate,
      rate: rate.rate / conversionValue.rate,
    }));
  }

  const objectFromRates = rates.reduce((acc, rate) => {
    return {
      ...acc,
      [rate.currency]: rate.rate,
    };
  }, {});

  return { 
    ...objectFromRates
  };
};
