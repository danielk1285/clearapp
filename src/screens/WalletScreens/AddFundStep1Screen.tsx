import React, {useEffect} from 'react';
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
import {configureLayoutAnimations} from 'react-native-reanimated/lib/typescript/reanimated2/core';

function AddFundStep1Screen() {
  const navigate = useNavigate();

  const {data} = useGetCountriesQuery(undefined);
  const {data: currenciesData} = useGetCurrenciesQuery(undefined);
  console.log('currenciesData', currenciesData);
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

  const countryConfigurations = {
    US: {
      fields: [
        // {name: 'bankCountry', label: 'Bank Country', type: 'text'},
        {name: 'bankName', label: 'Bank Name', type: 'text'},
        {name: 'accountCurrency', label: 'Account Currency', type: 'text'},
        {name: 'ownerName', label: 'Owner Name', type: 'text'},
        {name: 'accountName', label: 'Account Number', type: 'numeric'},
        {
          name: 'confirmAccountName',
          label: 'Confirm Account Number',
          type: 'numeric',
        },
      ],
      validationSchema: yup.object({
        // bankCountry: yup.string().required('Bank Country is required'),
        bankName: yup.string().required('Bank Name is required'),
        accountCurrency: yup.string().required('Account Currency is required'),
        ownerName: yup.string().required('Owner Name is required'),
        accountName: yup.string().required('Account Number is required'),
        confirmAccountName: yup
          .string()
          .oneOf([yup.ref('accountName'), null], 'Account Numbers must match')
          .required('Confirmation of Account Number is required'),
      }),
    },
    Israel: {
      fields: [
        // {name: 'bankCountry', label: 'Bank Country', type: 'text'},
        {name: 'bankName', label: 'Bank Name', type: 'text'},
        {name: 'accountCurrency', label: 'Account Currency', type: 'text'},
        {name: 'ownerName', label: 'Owner Name', type: 'text'},
        {name: 'accountName', label: 'Account Number', type: 'numeric'},
        {
          name: 'confirmAccountName',
          label: 'Confirm Account Number',
          type: 'numeric',
        },
      ],
      validationSchema: yup.object({
        // bankCountry: yup.string().required('Bank Country is required'),
        bankName: yup.string().required('Bank Name is required'),
        accountCurrency: yup.string().required('Account Currency is required'),
        ownerName: yup.string().required('Owner Name is required'),
        accountName: yup.string().required('Account Number is required'),
        confirmAccountName: yup
          .string()
          .oneOf([yup.ref('accountName'), null], 'Account Numbers must match')
          .required('Confirmation of Account Number is required'),
      }),
    },
  };
  const initialValues = {
    bankCountry: '',
    bankName: '',
    nickname: '',
    accountCurrency: '',
    preferredCurrency: '',
    ownerName: '',
    accountName: '',
    // confirmAccountName: '',
  };

  const [selectedCountry, setSelectedCountry] = React.useState('US');
  const config =
    countryConfigurations[
      selectedCountry as keyof typeof countryConfigurations
    ];

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      dispatch(updateAddBank(value));
      navigate('addFundStep2Screen', {
        ...params,
        bankFormData: value,
        selectedCountry,
      });
    },
    validationSchema: config.validationSchema,
  });
  useEffect(() => {
    formik.setValues(
      config.fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: '',
        }),
        {} as {
          bankCountry: string;
          bankName: string;
          nickname: string;
          accountCurrency: string;
          preferredCurrency: string;
          ownerName: string;
          accountName: string;
          confirmAccountName: string;
        },
      ),
    );
    formik.setErrors({});
    formik.setTouched({});
  }, [selectedCountry]);

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
          items={[
            {value: 'US', label: 'United States'},
            {value: 'Israel', label: 'Israel'},
          ]}
          onChange={item => setSelectedCountry(item.value)}
          value={selectedCountry}
        />

        {config.fields.map(field => (
          field.name === 'accountCurrency' ? (currenciesData && (
            <CustomActionsheetList
              key={field.name}
              title={field.label}
              items={currenciesData.data || []}
              onChange={item => setFieldValue(field.name, item.value)}
              value={formik.values[field.name]}
            />)
          ) : (
          <CustomInput
            key={field.name}
            title={field.label}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={formik.values[field.name]}
            onChangeText={formik.handleChange(field.name)}
            onBlur={formik.handleBlur(field.name)}
            error={
              formik.errors[field.name] && formik.touched[field.name]
                ? formik.errors[field.name]
                : ''
            }
            keyboardType={field.type === 'numeric' ? 'numeric' : 'default'}
          />
        )))}
        <GradientButton onPress={handleSubmit}>Continue</GradientButton>
      </VStack>
    </KeyboardAwareView>
  );
}

const addFundStep1Screen = asRoute(AddFundStep1Screen, 'addFundStep1Screen', {
  title: 'Add Bank',
});

export default addFundStep1Screen;
