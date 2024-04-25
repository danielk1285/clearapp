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

  // const validationSchema = yup.object().shape({
  //   bankCountry: yup.string().required('Bank Country is required'),
  //   bankName: yup.string().required('Bank Name is required'),
  //   routingNumber: yup.string().required('Routing Number is required'),
  //   ownerName: yup.string().required('Owner Name is required'),
  //   accountCurrency: yup.string().required('Account Currency is required'),
  //   accountName: yup.string().required('Account Name is required'),
  //   confirmAccountName: yup
  //     .string()
  //     .oneOf([yup.ref('accountName'), null], 'Account Name must match'),
  //   swiftCode: yup.string().required('SWIFT Code is required'),
  //   bankAddress: yup.string().required('Bank Address is required'),
  // });

  const countryConfigurations = {
    US: {
      fields: [
        {name: 'bankCountry', label: 'Bank Country', type: 'text'},
        {name: 'bankName', label: 'Bank Name', type: 'text'},
        {name: 'accountCurrency', label: 'Account Currency', type: 'text'},
        {name: 'ownerName', label: 'Owner Name', type: 'text'},
        {name: 'accountName', label: 'Account Number', type: 'numeric'},
        {
          name: 'confirmAccountName',
          label: 'Confirm Account Number',
          type: 'numeric',
        },
        {name: 'swiftCode', label: 'SWIFT Code', type: 'text'},
        {name: 'bankAddress', label: 'Bank Address', type: 'text'},
        {name: 'routingNumber', label: 'Routing Number', type: 'numeric'},
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
        swiftCode: yup.string().required('SWIFT Code is required'),
        bankAddress: yup.string().required('Bank Address is required'),
        routingNumber: yup.string().required('Routing Number is required'),
      }),
    },
    Israel: {
      fields: [
        {name: 'bankCountry', label: 'Bank Country', type: 'text'},
        {name: 'bankName', label: 'Bank Name', type: 'text'},
        {name: 'accountCurrency', label: 'Account Currency', type: 'text'},
        {name: 'ownerName', label: 'Owner Name', type: 'text'},
        {name: 'accountName', label: 'Account Number', type: 'numeric'},
        {
          name: 'confirmAccountName',
          label: 'Confirm Account Number',
          type: 'numeric',
        },
        {name: 'swiftCode', label: 'SWIFT Code', type: 'text'},
        {name: 'bankAddress', label: 'Bank Address', type: 'text'},
        {name: 'iban', label: 'IBAN', type: 'text'},
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
        swiftCode: yup.string().required('SWIFT Code is required'),
        bankAddress: yup.string().required('Bank Address is required'),
        iban: yup.string().required('IBAN is required'),
      }),
    },
  };
  const initialValues = {
    bankCountry: '',
    bankName: '',
    routingNumber: '',
    nickname: '',
    accountCurrency: '',
    preferredCurrency: '',
    ownerName: '',
    accountName: '',
    confirmAccountName: '',
    swiftCode: '',
    bankAddress: '',
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
          routingNumber: string;
          nickname: string;
          accountCurrency: string;
          preferredCurrency: string;
          ownerName: string;
          accountName: string;
          confirmAccountName: string;
          swiftCode: string;
          bankAddress: string;
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
      {/* <VStack p="20px" space="4">
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
          title="Owner Name"
          placeholder="Enter your owner name"
          onChangeText={text => setFieldValue('ownerName', text)}
          error={errors.ownerName}
        />
        <CustomInput
          title="Account Number"
          placeholder="Enter your account number"
          onChangeText={text => setFieldValue('accountName', text)}
          error={errors.accountName}
          touched={touched.accountName}
          keyboardType="numeric"
        />
        <CustomInput
          title="Confirm Account Number"
          placeholder="Enter your account number"
          onChangeText={text => setFieldValue('confirmAccountName', text)}
          error={errors.confirmAccountName}
          touched={touched.confirmAccountName}
          keyboardType="numeric"
        />
        <CustomInput
          title="SWIFT Code"
          placeholder="Enter your bank's SWIFT code"
          onChangeText={text => setFieldValue('swiftCode', text)}
          error={errors.swiftCode}
          touched={touched.swiftCode}
        />
        <CustomInput
          title="Bank Address"
          placeholder="Enter your bank's full address"
          onChangeText={text => setFieldValue('bankAddress', text)}
          error={errors.bankAddress}
          touched={touched.bankAddress}
          multiline={true} // Enable multiline input for address
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
      </VStack> */}
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
        
        ))}
          <GradientButton onPress={handleSubmit}>Continue</GradientButton>
      </VStack>
    </KeyboardAwareView>
  );
}

const addFundStep1Screen = asRoute(AddFundStep1Screen, 'addFundStep1Screen', {
  title: 'Add Bank',
});

export default addFundStep1Screen;
