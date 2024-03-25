import {View, Text} from 'react-native';
import React from 'react';
import CustomActionsheetList from '@actionSheets/CustomActionsheetList/CustomActionsheetList';
import {useGetCountriesQuery} from '@store/apis/countriesApi';

export default function CountrySelector() {
  const {data} = useGetCountriesQuery(undefined);

  return (
    <View>
      <CustomActionsheetList
        title="Country"
        value={values.country}
        actionList={moneyList}
        fieldName="country"
        handelEvent={setFieldValue}
        placeholder="Enter Country"
        error={errors.country}
        touched={touched.country}
      />

      {/* <CustomActionsheetList
        title="State"
        value={values.state}
        actionList={moneyList}
        fieldName="state"
        handelEvent={setFieldValue}
        placeholder="Enter State"
        error={errors.state}
        touched={touched.state}
      />

      <CustomInput
        title="City"
        placeholder="Enter City"
        onChangeText={text => setFieldValue('city', text)}
        error={errors.city}
        touched={touched.city}
      /> */}
    </View>
  );
}
