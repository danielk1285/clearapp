import CustomActionsheetList from '@actionSheets/CustomActionsheetList/CustomActionsheetList';
import {moneyList} from '@appData/moneyList';
import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import TextButton from '@components/TextButton/TextButton';
import useNavigate from '@hooks/useNavigate';
import CustomDatePicker from '@layouts/CustomDatePicker/CustomDatePicker';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import colors from '@theme/colors';
import {useFormik} from 'formik';
import {VStack} from 'native-base';
import React from 'react';
import asRoute from 'hoc/asRoute';

function BusinessDetailsStep1() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('dashBoardScreen');
  };

  const handleToNext = () => {
    navigate('businessDetailsStep2Screen');
  };

  const initialValues = {
    name: '',
    dba: '',
    date: new Date(),
    registrationNumber: '',
    organization: '',
    industry: '',
    organizationDescription: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      console.log(value);
    },
    // validationSchema: schema,
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
      <VStack px="20px" bg={colors.bg} flex={1} space="4" py={4}>
        <CustomInput
          title="Registered organization name"
          placeholder="Enter name"
          onChangeText={text => setFieldValue('name', text)}
        />
        <CustomInput
          title="DBA Doing Business As (Optional)"
          placeholder="Enter DBA"
          onChangeText={text => setFieldValue('dba', text)}
        />

        <CustomDatePicker
          title="Incorporation Date"
          placeholder="Select Date"
          fieldName="date"
          setFieldValue={setFieldValue}
          value={values.date}
        />

        <CustomInput
          title="Registration Number"
          placeholder="Enter registration number"
          onChangeText={text => setFieldValue('registrationNumber', text)}
        />

        <CustomInput
          title="Your role in the organization"
          placeholder="Enter your role "
          onChangeText={text => setFieldValue('organization', text)}
        />

        <CustomActionsheetList
          title="Industry"
          value={values.industry}
          actionList={moneyList}
          fieldName="industry"
          handelEvent={setFieldValue}
          placeholder="Select industry"
        />

        <VStack my="30px">
          <GradientButton onPress={handleToNext}>
            I Did That Already
          </GradientButton>
        </VStack>
        <TextButton
          onPress={handleSkip}
          mb="20px"
          title="Skip for now"
          fontSize="md"
        />
      </VStack>
    </KeyboardAwareView>
  );
}

const businessDetailsStep1Screen = asRoute(
  BusinessDetailsStep1,
  'businessDetailsStep1Screen',
  {
    title: 'Business Details',
  },
);

export default businessDetailsStep1Screen;
