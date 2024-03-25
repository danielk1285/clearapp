export interface ISelect {
  label: string;
  value: string;
}

export interface ICustomActionSheet {
  placeholder: string;
  title: string;
  error?: string;
  touched?: boolean;
  value?: string;
  label?: string;
  items: ISelect[];
  onChange: (value: ISelect) => void;
  isDisabled?: boolean;
  onPress?: () => void;
  fieldValue?: string;
}
