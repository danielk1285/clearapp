export interface IBankAccount {
  accountCurrency: string;
  accountNumber: string;
  bankAddress: string;
  bankCountry: string;
  bankName: string;
  branchNumber: string;
  iban: string;
  nickname?: string;
  preferredCurrency: string;
  routingNumber: string;
  swift: string;
  verificationImageLink: string;
  verificationStatus?: string;
}
