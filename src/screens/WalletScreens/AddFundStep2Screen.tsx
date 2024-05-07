import React, {useState, useEffect} from 'react';
import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {useRoute} from '@react-navigation/native';
import {updateAddBank} from '@store/features/addBankSlice';
import {useFormik} from 'formik';
import asRoute from 'hoc/asRoute';
import {VStack} from 'native-base';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {ITransectionData} from '@typedef/common.types';
import { Text } from 'react-native-svg';

function AddFundStep2Screen() {
  const navigate = useNavigate();
  const params = useRoute().params as ITransectionData & {bankFormData: any};
  const country = useRoute().params?.selectedCountry;
  const dispatch = useDispatch();

  // Initialize field configuration based on country or other conditions
  const [fieldConfig, setFieldConfig] = useState({
    accountNumber: country === 'US',
    confirmAccountNumber: country === 'US',
    iban: country !== 'US',
    swift: country !== 'US',
    bankAddress: true,
    routingNumber: country === 'US',
  });

  useEffect(() => {
    // Dynamically set the visibility of fields based on country
    setFieldConfig({
      accountNumber: country === 'US',
      confirmAccountNumber: country === 'US',
      iban: country !== 'US',
      swift: country !== 'US',
      bankAddress: true,
      routingNumber: country === 'US',
    });
  }, [country]);

  // More specific validation rules
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Owner Name is required'),
    // accountNumber: fieldConfig.accountNumber ? yup.string().required('Account Number is required').matches(/^\d+$/, 'Account Number must be numeric') : null,
    // confirmAccountNumber: fieldConfig.confirmAccountNumber ? yup.string().required('Confirm Account Number is required').oneOf([yup.ref('accountNumber')], 'Account Numbers must match') : null,
    iban: fieldConfig.iban
      ? yup
          .string()
          .required('IBAN is required')
          .matches(/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/, 'Invalid IBAN format')
      : null,
    swift: fieldConfig.swift
      ? yup
          .string()
          .required('SWIFT is required')
          .matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Invalid SWIFT code')
      : null,
    bankAddress: yup.string().required('Bank Address is required'),
    routingNumber: fieldConfig.routingNumber
      ? yup
          .string()
          .required('Routing Number is required')
          .matches(/^\d{9}$/, 'Routing Number must be 9 digits')
      : null,
  });

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      // accountNumber: '',
      // confirmAccountNumber: '',
      iban: '',
      swift: '',
      bankAddress: '',
      routingNumber: '',
    },
    onSubmit: async values => {
      console.log('Form submission started');
      console.log('Form values:', values);
      console.log('Form errors:', formik.errors);

      if (Object.keys(formik.errors).length === 0) {
        dispatch(updateAddBank(values));
        navigate('addFundStep3Screen', {
          ...params,
          bankFormData: {
            ...params.bankFormData,
            ...values,
          },
        });
      } else {
        console.log('Form has validation errors, not submitting');
      }
    },
    validationSchema,
  });

  console.log('Is form valid?', formik.isValid);
  console.log('Is form dirty?', formik.dirty);
  console.log('Form errors:', formik.errors);

  return (
    <KeyboardAwareView>
      <VStack p="20px" space="4">
        <CustomInput
          title="Owner Name (Bank)"
          placeholder="Enter owner name"
          onChangeText={formik.handleChange('ownerName')}
          onBlur={formik.handleBlur('ownerName')}
          error={
            formik.errors.ownerName && formik.touched.ownerName
              ? formik.errors.ownerName
              : ''
          }
        />
        <CustomInput
          title="Bank Address"
          placeholder="Enter Bank Address"
          onChangeText={formik.handleChange('bankAddress')}
          onBlur={formik.handleBlur('bankAddress')}
          error={
            formik.errors.bankAddress && formik.touched.bankAddress
              ? formik.errors.bankAddress
              : ''
          }
        />
        {/* {fieldConfig.accountNumber && (
          <CustomInput
            title="Account Number"
            placeholder="Enter Account Number"
            onChangeText={formik.handleChange('accountNumber')}
            onBlur={formik.handleBlur('accountNumber')}
            error={formik.errors.accountNumber && formik.touched.accountNumber ? formik.errors.accountNumber : ''}
            keyboardType="numeric"
          />
        )} */}
        {fieldConfig.routingNumber && (
          <CustomInput
            title="Routing Number"
            placeholder="Enter Routing Number"
            onChangeText={formik.handleChange('routingNumber')}
            onBlur={formik.handleBlur('routingNumber')}
            error={
              formik.errors.routingNumber && formik.touched.routingNumber
                ? formik.errors.routingNumber
                : ''
            }
            keyboardType="numeric"
          />
        )}
        {
          // errors
          Object.entries(formik.errors).map((error, index) => (
            <Text key={index} style={{ color: 'red' }}>
              {error}
            </Text>
          ))
        }
        {/* Other fields similar to the above */}
        <GradientButton
          onPress={() => {
            console.log('Button pressed');
            formik.handleSubmit();
          }}>
          Continue
        </GradientButton>
      </VStack>
    </KeyboardAwareView>
  );
}

const addFundStep2Screen = asRoute(AddFundStep2Screen, 'addFundStep2Screen', {
  title: 'Add Bank Account',
});

export default addFundStep2Screen;
