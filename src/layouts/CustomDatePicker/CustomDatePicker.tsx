import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import DropDownButton from '@components/DropDownButton/DropDownButton';
import {CalendarIcon} from '@assets/svg/icons';
import moment from 'moment';

const CustomDatePicker = ({
  title,
  setFieldValue,
  placeholder,
  value,
  fieldName,
  mode='datetime',
}: {
  title: string;
  setFieldValue: (fieldName: string, value: string) => void;
  placeholder: string;
  value: string;
  fieldName: string;
  mode?: 'date' | 'time' | 'datetime';
}) => {
  const [open, setOpen] = useState(false);

  const isValidDate = (dateString: string) => {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
  };

  const dateValue = isValidDate(value) ? new Date(value) : new Date(); // Ensure this is always a valid date

  const handleConfirm = date => {
    setOpen(false);
    if (isValidDate(date)) {
      setFieldValue(fieldName, moment(date).format('YYYY-MM-DD'));
    }
  };

  return (
    <>
      <DropDownButton
        onPress={() => setOpen(true)}
        title={title}
        placeholder={placeholder}
        value={isValidDate(value) ? moment(value).format('LL') : ''}
        icon={<CalendarIcon />}
      />
      <DatePicker
        modal
        open={open}
        date={dateValue}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        mode={mode}
      />
    </>
  );
};

export default CustomDatePicker;
