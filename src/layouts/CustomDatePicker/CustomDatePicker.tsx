import {CalendarIcon} from '@assets/svg/icons';
import DropDownButton from '@components/DropDownButton/DropDownButton';
import moment from 'moment';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {ICustomDatePicker} from './CustomDatePicker.types';

export default function CustomDatePicker({
  title,
  setFieldValue,
  placeholder,
  value,
  fieldName,
}: ICustomDatePicker) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropDownButton
        onPress={() => setOpen(true)}
        title={title}
        placeholder={placeholder}
        // value={moment()}
        icon={<CalendarIcon />}
      />
      <DatePicker
        modal
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          setFieldValue(fieldName, moment(date).format('MM/DD/YYYY'));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
