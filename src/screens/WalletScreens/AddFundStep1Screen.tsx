import React from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {VStack} from 'native-base';
import useNavigate from '@hooks/useNavigate';
import {useFormik} from 'formik';
import CustomActionsheetList from '@actionSheets/CustomActionsheetList/CustomActionsheetList';
import {moneyList} from '@appData/moneyList';
import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import * as yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import {
  useGetBanksByCountryQuery,
  useGetCountriesQuery,
} from '@store/apis/countriesApi';
import {useGetCurrenciesQuery} from '@store/apis/bankAccounntsApi';
import {ITransectionData} from '@typedef/common.types';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateAddBank} from '@store/features/addBankSlice';

function AddFundStep1Screen() {
  const navigate = useNavigate();

  const {data} = useGetCountriesQuery(undefined);
  const {data: currenciesData} = useGetCurrenciesQuery(undefined);
  const params = useRoute().params as ITransectionData;

  const dispatch = useDispatch();

  const [bankCountry, setBankCountry] = React.useState('');

  const {
    data: banksData,
    isLoading,
    error,
  } = useGetBanksByCountryQuery(
    {
      countryName: bankCountry || '',
    },
    {
      skip: !bankCountry,
    },
  );

  const validationSchema = yup.object().shape({
    bankCountry: yup.string().required('Bank Country is required'),
    bankName: yup.string().required('Bank Name is required'),
    routingNumber: yup.string().required('Routing Number is required'),
    accountCurrency: yup.string().required('Account Currency is required'),
  });

  const initialValues = {
    bankCountry: '',
    bankName: '',
    routingNumber: '',
    nickname: '',
    accountCurrency: '',
    preferredCurrency: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      dispatch(updateAddBank(value));
      navigate('addFundStep2Screen', {
        ...params,
        bankFormData: value,
      });
    },
    validationSchema,
  });

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
  } = formik;

  return (
    <KeyboardAwareView>
      <VStack p="20px" space="4">
        <CustomActionsheetList
          title="Choose Bank Country"
          value={values.bankCountry}
          placeholder="Select bank country"
          error={errors.bankCountry}
          touched={touched.bankCountry}
          items={data?.data}
          onChange={item => {
            setFieldValue('bankCountry', item.value);
            setBankCountry(item.value);
          }}
        />
        <CustomActionsheetList
          title="Choose Bank"
          value={values.bankName}
          items={banksData?.data}
          onChange={item => setFieldValue('bankName', item.value)}
          placeholder="Select a bank"
          error={errors.bankName}
          touched={touched.bankName}
        />
        <CustomActionsheetList
          title="Choose Account Currency"
          value={values.accountCurrency}
          items={currenciesData?.data}
          onChange={item => {
            setFieldValue('accountCurrency', item.value);
            setFieldValue('preferredCurrency', item.value);
          }}
          placeholder="Select account currency"
          error={errors.accountCurrency}
          touched={touched.accountCurrency}
        />
        <CustomInput
          title="Account Nickname (Opt.)"
          placeholder="Enter your account nickname"
          onChangeText={text => setFieldValue('nickname', text)}
        />
        <CustomInput
          title="Routing Number"
          placeholder="Enter your routing number"
          onChangeText={text => setFieldValue('routingNumber', text)}
          error={errors.routingNumber}
          touched={touched.routingNumber}
          keyboardType="numeric"
        />
        <VStack my="30px">
          <GradientButton onPress={handleSubmit}>Continue</GradientButton>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}

const addFundStep1Screen = asRoute(AddFundStep1Screen, 'addFundStep1Screen', {
  title: 'Add Bank',
});

export default addFundStep1Screen;
