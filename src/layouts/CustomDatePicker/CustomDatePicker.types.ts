export interface ICustomDatePicker {
    title: string;
    value: string | Date;
    setFieldValue: (value: string, date: Date) => void;
    fieldName: string;
    placeholder: string;
}