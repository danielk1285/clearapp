import CustomActionsheetList from '@actionSheets/CustomActionsheetList/CustomActionsheetList';
import {moneyList} from '@appData/moneyList';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import colors from '@theme/colors';
import {useFormik} from 'formik';
import {VStack} from 'native-base';
import React from 'react';
import asRoute from 'hoc/asRoute';

function BusinessDetailsStep3() {
  const navigate = useNavigate();

  const handleToNext = () => {
    navigate('identityDetailsScreen');
  };

  const initialValues = {
    residentInUSCountry: '',
    residentInOtherCountry: '',
    tinInUSCountry: '',
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
          title="Is the organization a tax resident in United States?"
          value={values.residentInUSCountry}
          actionList={moneyList}
          fieldName="residentInOtherCountry"
          handelEvent={setFieldValue}
          placeholder="Select resident in US country"
        />

        <CustomActionsheetList
          title="Is the organization a tax resident in any country other than United States?"
          value={values.residentInOtherCountry}
          actionList={moneyList}
          fieldName="residentInOtherCountry"
          handelEvent={setFieldValue}
          placeholder="Select resident in other country"
        />

        <CustomActionsheetList
          title="Your tax identification number (TIN) in United States:"
          value={values.tinInUSCountry}
          actionList={moneyList}
          fieldName="tinInUSCountry"
          handelEvent={setFieldValue}
          placeholder="Select TIN in US"
        />

        <VStack my="30px">
          <GradientButton onPress={handleToNext}>
            I Did That Already
          </GradientButton>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}

const businessDetailsStep3Screen = asRoute(
  BusinessDetailsStep3,
  'businessDetailsStep3Screen',
  {
    title: 'Business Details',
  },
);

export default businessDetailsStep3Screen;
