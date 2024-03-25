export interface IAccountList {
    accountList: IAccount[];
}

export interface IAccount {
    id: number;
    title: string;
    amount: string;
    date: Date | string;
}