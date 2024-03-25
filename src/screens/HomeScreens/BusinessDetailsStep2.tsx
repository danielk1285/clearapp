import CustomActionsheetList from '@actionSheets/CustomActionsheetList/CustomActionsheetList';
import {moneyList} from '@appData/moneyList';
import CustomCheckbox from '@components/CustomCheckbox/CustomCheckbox';
import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import TextButton from '@components/TextButton/TextButton';
import useNavigate from '@hooks/useNavigate';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import colors from '@theme/colors';
import {useFormik} from 'formik';
import asRoute from 'hoc/asRoute';
import {VStack} from 'native-base';
import React from 'react';

function BusinessDetailsStep2() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('dashBoardScreen');
  };

  const handleToNext = () => {
    navigate('businessDetailsStep3Screen');
  };

  const initialValues = {
    country: '',
    state: '',
    city: '',
    street: '',
    houseNumber: '',
    postalNumber: '',
    checked: false,
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
        <CustomActionsheetList
          title="Country"
          value={values.country}
          actionList={moneyList}
          fieldName="country"
          handelEvent={setFieldValue}
          placeholder="Select country"
        />

        <CustomActionsheetList
          title="State"
          value={values.state}
          actionList={moneyList}
          fieldName="state"
          handelEvent={setFieldValue}
          placeholder="Select state"
        />

        <CustomInput
          title="City"
          placeholder="Enter city name"
          onChangeText={text => setFieldValue('city', text)}
        />

        <CustomInput
          title="Street"
          placeholder="Enter street name"
          onChangeText={text => setFieldValue('street', text)}
        />

        <CustomInput
          title="House Number"
          placeholder="Enter house number"
          onChangeText={text => setFieldValue('houseNumber', text)}
        />

        <CustomInput
          title="Postal Number"
          placeholder="Enter postal number"
          onChangeText={text => setFieldValue('postalNumber', text)}
        />

        <CustomCheckbox
          onPress={() => setFieldValue('checked', !values.checked)}
          title="I would like to transfer funds from the country I selected above"
          value={values.checked}
          mt="20px"
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

const businessDetailsStep2Screen = asRoute(
  BusinessDetailsStep2,
  'businessDetailsStep2Screen',
  {
    title: 'Business Details',
  },
);

export default businessDetailsStep2Screen;
