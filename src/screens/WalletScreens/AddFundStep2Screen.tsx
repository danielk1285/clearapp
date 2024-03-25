import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {useRoute} from '@react-navigation/native';
import {updateAddBank} from '@store/features/addBankSlice';
import {ITransectionData} from '@typedef/common.types';
import {useFormik} from 'formik';
import asRoute from 'hoc/asRoute';
import {VStack} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';

function AddFundStep2Screen() {
  const navigate = useNavigate();
  const params = useRoute().params as ITransectionData & {bankFormData: any};
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Owner Name is required'),
    accountNumber: yup
      .string()
      .required('Account Number is required')
      .matches(/^\d+$/, 'Account Number must be a number'),
    confirmAcccountNumber: yup
      .string()
      .required('Confirm Account Number is required')
      .oneOf([yup.ref('accountNumber')], 'Account Numbers must match'),
    iban: yup.string().required('IBAN is required'),
    swift: yup.string().required('SWIFT is required'),
  });

  const initialValues = {
    ownerName: '',
    accountNumber: '',
    confirmAcccountNumber: '',
    iban: '',
    swift: '',
    bankAddress: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      dispatch(updateAddBank(value));
      navigate('addFundStep3Screen', {
        ...params,
        bankFormData: {
          ...params.bankFormData,
          ...value,
        },
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
        <CustomInput
          title="Owner Name"
          placeholder="Enter owner name"
          onChangeText={text => setFieldValue('ownerName', text)}
          error={errors.ownerName}
          touched={touched.ownerName}
        />
        <CustomInput
          title="Account Number"
          placeholder="Account Number"
          onChangeText={text => setFieldValue('accountNumber', text)}
          error={errors.accountNumber}
          touched={touched.accountNumber}
          keyboardType="numeric"
        />
        <CustomInput
          title="Repeat account number"
          placeholder="Re-enter account number"
          onChangeText={text => setFieldValue('confirmAcccountNumber', text)}
          error={errors.confirmAcccountNumber}
          touched={touched.confirmAcccountNumber}
          keyboardType="numeric"
        />
        <CustomInput
          title="IBAN"
          placeholder="Enter IBAN"
          onChangeText={text => setFieldValue('iban', text)}
          error={errors.iban}
          touched={touched.iban}
        />
        <CustomInput
          title="SWIFT"
          placeholder="Enter SWIFT"
          onChangeText={text => setFieldValue('swift', text)}
          error={errors.swift}
          touched={touched.swift}
        />
        <CustomInput
          title="Bank Address"
          placeholder="Enter bank address"
          onChangeText={text => setFieldValue('bankAddress', text)}
          error={errors.bankAddress}
          touched={touched.bankAddress}
          height={100}
          multiline
          textAlignVertical="top"
        />
        <VStack my="30px">
          <GradientButton onPress={handleSubmit}>Continue</GradientButton>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}

const addFundStep2Screen = asRoute(AddFundStep2Screen, 'addFundStep2Screen', {
  title: 'Add Bank Account',
});

export default addFundStep2Screen;
