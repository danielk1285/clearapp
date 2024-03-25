import CustomActionsheetList from '@actionSheets/CustomActionsheetList/CustomActionsheetList';
import {ISelect} from '@actionSheets/CustomActionsheetList/CustomActionsheetList.type';
import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import LoaderModal from '@layouts/LoaderModal.tsx/LoaderModal';
import {
  useGetCityByStateQuery,
  useGetCountriesQuery,
  useGetStatesByCountryQuery,
} from '@store/apis/countriesApi';
import {useValidateUserAddressDetailsMutation} from '@store/apis/userValidationApi';
import {useFormik} from 'formik';
import {VStack} from 'native-base';
import React from 'react';
import * as yup from 'yup';
import asRoute from '../../hoc/asRoute';
import {useRoute} from '@react-navigation/native';
import {ITransectionData} from '@typedef/common.types';

function AddNewAccountScreen() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = React.useState<ISelect>();
  const [selectedState, setSelectedState] = React.useState<ISelect>();
  const params = useRoute().params as ITransectionData;

  const [submitFormFn, submitFormResult] =
    useValidateUserAddressDetailsMutation();

  const {data} = useGetCountriesQuery(undefined);
  const {data: statesData} = useGetStatesByCountryQuery(
    selectedCountry?.value,
    {
      skip: !selectedCountry?.value,
    },
  );
  const {data: citiesData} = useGetCityByStateQuery(
    {
      countryName: selectedCountry?.value || '',
      stateName: selectedState?.value || '',
    },
    {
      skip: !selectedCountry?.value || !selectedState?.value,
    },
  );

  const validationSchema = yup.object().shape({
    addressLine1: yup.string().required('Address Line 1 is required'),
    addressLine2: yup.string(),
    city: yup.string().required('City name is required'),
    country: yup.string().required('Country name is required'),
    state: yup.string().required('State name is required'),
    zipCode: yup.string().required('Zip Code is required'),
  });

  const initialValues = {
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      try {
        await submitFormFn(value).unwrap();
        navigate('identityDetailsScreen', params);
      } catch (e: any) {
        alert(e.data.message);

        console.log(e);
      }
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
      <VStack bg="#F8F8F8" px="20px" pt="10px" flex={1} space="4">
        <CustomInput
          title="Address Line 1 (Street, house number) *"
          placeholder="Enter Address Line 1"
          onChangeText={text => setFieldValue('addressLine1', text)}
          error={errors.addressLine1}
          touched={touched.addressLine1}
        />
        <CustomInput
          title="Address Line 2 (Apt number, floor)"
          placeholder="Enter Address Line 2"
          onChangeText={text => setFieldValue('addressLine2', text)}
          error={errors.addressLine2}
          touched={touched.addressLine2}
        />

        <CustomActionsheetList
          title="Country *"
          value={values.country}
          placeholder="Enter Country"
          error={errors.country}
          touched={touched.country}
          items={data?.data}
          onChange={item => {
            setSelectedCountry(item);
            setFieldValue('country', item.value);
          }}
        />

        <CustomActionsheetList
          title="State *"
          value={values.state}
          placeholder="Enter State"
          error={errors.state}
          touched={touched.state}
          items={statesData?.data}
          disabled={!selectedCountry?.value}
          onChange={item => {
            setSelectedState(item);
            setFieldValue('state', item.value);
          }}
        />

        <CustomActionsheetList
          disabled={!selectedCountry?.value || !selectedState?.value}
          title="City *"
          value={values.city}
          placeholder="Enter City"
          error={errors.city}
          touched={touched.city}
          items={citiesData?.data}
          onChange={item => {
            setFieldValue('city', item.value);
          }}
        />

        <CustomInput
          title="Zip Code *"
          placeholder="Enter Zip Code"
          onChangeText={text => setFieldValue('zipCode', text)}
          error={errors.zipCode}
          touched={touched.zipCode}
          keyboardType="number-pad"
        />

        <VStack my="30px">
          <GradientButton onPress={handleSubmit}>Next</GradientButton>
        </VStack>
        <LoaderModal isLoading={submitFormResult.isLoading} />
      </VStack>
    </KeyboardAwareView>
  );
}

const addNewAccountScreen = asRoute(
  AddNewAccountScreen,
  'addNewAccountScreen',
  {
    title: 'Add New Account',
  },
);

export default addNewAccountScreen;
