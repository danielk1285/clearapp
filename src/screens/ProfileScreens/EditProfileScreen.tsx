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

  console.log(data?.data);

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
    birthDate: data?.data?.birthDay || '',
    email: data?.data?.email || '',
    country: data?.data?.country || '',
    phone: data?.data?.phone || '',
    organization: data?.data?.organizationDescription || '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      try {
        const data = await updateProfileFn({
          firstName: value.firstName,
          lastName: value.lastName,
          birthDay: value.birthDate,
          email: value.email,
          country: value.country,
          phone: value.phone,
          organizationDescription: value.organization,
        }).unwrap();
        console.log(data);
        navigation.goBack();
      } catch (error: any) {
        alert(error?.data?.message || 'Something went wrong');
        console.log(error);
      }
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

  const handleToDone = () => {
    navigation.goBack();
  };

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
          placeholder="12/27/1995"
          value={values.birthDate}
          fieldName="birthDate"
          setFieldValue={setFieldValue}
        />
        <CustomInput
          title="Email"
          placeholder="name@gmail.com"
          onChangeText={text => setFieldValue('email', text)}
        />
        <CustomActionsheetList
          title="Country"
          value={values.country}
          actionList={moneyList}
          fieldName="country"
          handelEvent={setFieldValue}
          placeholder="Select country"
          onPress={() => setShow(true)}
          fieldValue={values.country}
          //   value
        />
        <CustomInput
          title="Phone"
          placeholder="Enter phone number"
          onChangeText={text => setFieldValue('phone', text)}
        />
        <CustomInput
          title="Please describe your organization"
          placeholder="Enter description"
          onChangeText={text => setFieldValue('organization', text)}
        />
        <VStack my="30px">
          <GradientButton onPress={handleToDone}>Done</GradientButton>
        </VStack>
      </VStack>
      <CountryPicker
        show={show}
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
