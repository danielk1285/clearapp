import CustomActionsheetList from '@actionSheets/CustomActionsheetList/CustomActionsheetList';
import {moneyList} from '@appData/moneyList';
import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import CustomDatePicker from '@layouts/CustomDatePicker/CustomDatePicker';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@store/apis/userValidationApi';
import {useFormik} from 'formik';
import asRoute from 'hoc/asRoute';
import {VStack} from 'native-base';
import React from 'react';
import {CountryPicker} from 'react-native-country-codes-picker';
import {Dimensions} from 'react-native';

function EditProfileScreen() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const {data} = useGetUserProfileQuery(undefined);
  const [updateProfileFn, {isLoading}] = useUpdateUserProfileMutation();
  const [show, setShow] = React.useState(false);

  // console.log(data?.data);

  React.useEffect(() => {
    async function registerAppWithFCM() {
      try {
        // await messaging().registerDeviceForRemoteMessages();
        // requestUserPermission();
        await messaging().requestPermission();
        const token = await messaging().getToken();
        console.log(token);
      } catch (error) {
        console.log(error);
      }
    }
    registerAppWithFCM();
  }, []);

  const initialValues = {
    firstName: data?.data?.firstName || '',
    lastName: data?.data?.lastName || '',
    birthDay: data?.data?.birthDay || '',
    email: data?.data?.email || '',
    country: data?.data?.country || '',
    phone: data?.data?.phone || '',
    organization: data?.data?.organizationDescription || '',
  };

  React.useEffect(() => {
    if (data?.data) {
      console.log('data', data);
      formik.setValues(initialValues);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const result = await updateProfileFn({
        firstName: values.firstName,
        lastName: values.lastName,
        birthDay: values.birthDay,
        email: values.email,
        country: values.country,
        phone: values.phone,
        organizationDescription: values.organization,
      }).unwrap();

      console.log('Profile updated successfully:', result);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(
        'Failed to update profile: ' + (error.data?.message || 'Unknown error'),
      );
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    // onSubmit: handleSubmit(),
    // validationSchema: schema,
  });

  const {values, handleChange, handleBlur, errors, touched, setFieldValue} =
    formik;

  // const handleToDone = () => {
  //   navigation.goBack();
  // };

  return (
    <KeyboardAwareView>
      <VStack p="20px" space="4">
        <CustomInput
          title="First Name"
          placeholder="Enter first name"
          onChangeText={text => setFieldValue('firstName', text)}
          value={values.firstName}
        />
        <CustomInput
          title="Last Name"
          placeholder="Enter last name"
          onChangeText={text => setFieldValue('lastName', text)}
          value={values.lastName}
        />
        <CustomDatePicker
          title="Birthdate"
          placeholder="Select your birthdate"
          value={values.birthDay}
          fieldName="birthDay"
          setFieldValue={setFieldValue}
          mode="date"
        />
        <CustomInput
          title="Email"
          placeholder="name@gmail.com"
          onChangeText={text => setFieldValue('email', text)}
          value={values.email}
        />
        <CustomInput
          title="Country"
          placeholder="Select country"
          onChangeText={text => setFieldValue('country', text)}
          value={values.country}
          onPressIn={() => setShow(true)}
          // touched={() => setShow(true)}
        />
        {/* <CustomActionsheetList
          title="Country"
          value={values.country}
          // actionList={moneyList}
          // fieldName="country"
          onChange={setFieldValue}
          placeholder="Select country"
          touched={() => setShow(true)}
          // value={values.country}
          //   value
        /> */}
        <CustomInput
          title="Phone"
          placeholder="Enter phone number"
          onChangeText={text => setFieldValue('phone', text)}
          value={values.phone}
        />
        <CustomInput
          title="Please describe your organization"
          placeholder="Enter description"
          onChangeText={text => setFieldValue('organization', text)}
          value={values.organization}
        />
        <VStack my="30px">
          <GradientButton onPress={handleSubmit}>Done</GradientButton>
        </VStack>
      </VStack>
      <CountryPicker
        show={show}
        lang="en"
        showOnly={['US', 'IL']}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={item => {
          //   console.log(item?.name['en']);
          setFieldValue('country', item?.name['en']);
          setShow(false);
        }}
        style={{
          modal: {
            height: Dimensions.get('window').height / 2,
          },
        }}
        onBackdropPress={() => setShow(false)}
      />
    </KeyboardAwareView>
  );
}
const editProfileScreen = asRoute(EditProfileScreen, 'editProfileScreen', {
  title: 'Edit Profile',
});

export default editProfileScreen;
