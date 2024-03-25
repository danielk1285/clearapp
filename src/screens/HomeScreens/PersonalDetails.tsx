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

function PersonalDetails() {
  const navigate = useNavigate();

  const params = useRoute().params as ITransectionData;

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().email().required('Email is required'),
    // phoneNumber: yup.string().required('Phone Number is required'),
  });

  const initialValues = {
    fullName: '',
    email: '',
    // phoneNumber: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      dispatch(updateAddBank(value));
      navigate('addNewAccountScreen', {
        ...params,
      });
    },
    validationSchema,
  });

  const {errors, touched, setFieldValue, handleSubmit} = formik;

  return (
    <KeyboardAwareView>
      <VStack p="20px" space="4">
        <CustomInput
          title="Full Name"
          placeholder="Enter your full name"
          onChangeText={text => setFieldValue('fullName', text)}
          error={errors.fullName}
          touched={touched.fullName}
        />
        <CustomInput
          title="Email"
          placeholder="Enter your email"
          onChangeText={text => setFieldValue('email', text)}
          error={errors.email}
          touched={touched.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <VStack my="30px">
          <GradientButton onPress={handleSubmit}>Continue</GradientButton>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}

const personalDetails = asRoute(PersonalDetails, 'personalDetails', {
  title: 'Personal Details',
});

export default personalDetails;
