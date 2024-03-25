export const myBalanceActionList = [
  {
    id: 1,
    icon: 'moneySend',
    title: 'Start Withdraw',
  },
  {
    id: 2,
    icon: 'moneyExchange',
    title: 'Start Exchange',
  },
];

export const exchangeOptions = [
  {
    id: 'Community',
    title: 'Sounds good',
    option: 'Up to 1 day',
  },
  {
    id: 'Spot',
    title: 'Exchange immediately to $3,400',
    option: 'Immediate',
  },
];
export function getExchangeSummary(lowerRate: number, upperRate: number) {
  return[
    {
      id: 1,
      summary: 'We are matching you with others.',
      icon: 'exchangeSummaryIcon',
    },
    {
      id: 2,
      summary: `To ensure fast exchange and hedge against market fluctuations, your exchange rate will be between ${lowerRate} - ${upperRate}.`,
      icon: 'exchangeSummaryIcon',
    },
    {
      id: 3,
      summary:
        'Whatever we cannot exchange in this rate in 3 days will remain in ₪ in your wallet',
      icon: 'exchangeSummaryIcon',
    },
  ];
}


export const transferAccountData = [
  {
    id: 1,
    name: 'Israel Mizrachi',
    amount: '$250',
    date: new Date(),
    currency: 'USD',
  },
  {
    id: 2,
    name: 'Business Bank of America',
    amount: '$870',
    date: new Date(),
    currency: 'USD',
  },
  {
    id: 3,
    name: 'PNC Financial Services',
    amount: '$550',
    date: new Date(),
    currency: 'USD',
  },
];
