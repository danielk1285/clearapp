import CustomActionsheetList from '@actionSheets/CustomActionsheetList/CustomActionsheetList';
import GradientButton from '@components/GradientButton';
import TextButton from '@components/TextButton/TextButton';
import useNavigate from '@hooks/useNavigate';
import FundUploadCard from '@layouts/FundUploadCard/FundUploadCard';
import ImageUploader from '@layouts/ImageUploader';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import LoaderModal from '@layouts/LoaderModal.tsx/LoaderModal';
import {useRoute} from '@react-navigation/native';
import {useValidateUserIdentityDetailsMutation} from '@store/apis/userValidationApi';
import colors from '@theme/colors';
import {ITransectionData} from '@typedef/common.types';
import {useFormik} from 'formik';
import {VStack} from 'native-base';
import React from 'react';
import * as Yup from 'yup';
import asRoute from 'hoc/asRoute';

const idTypes = [
  {
    label: 'Driver’s License',
    value: 'Driver’s License',
  },
  {
    label: 'Passport',
    value: 'Passport',
  },
  {
    label: 'National ID',
    value: 'National ID',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

const homeAddress = [
  {
    label: 'Utility Bill',
    value: 'Utility Bill',
  },
  {
    label: 'Bank Statement',
    value: 'Bank Statement',
  },
  {
    label: 'Credit Card Statement',
    value: 'Credit Card Statement',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

function IdentityDetailsScreen() {
  const navigate = useNavigate();
  const [isOpenIdentityActionsSheet, setIsOpenIdentityActionsSheet] =
    React.useState(false);
  const [isOpenHomeAddressActionsSheet, setIsOpenHomeAddressActionsSheet] =
    React.useState(false);

  const [validateUserIdentityDetails, validateUserIdentityResponse] =
    useValidateUserIdentityDetailsMutation();

  const params = useRoute().params as ITransectionData & {
    prevRoute: string;
  };

  console.log(params);

  const handleSkip = () => {
    if (
      params.type === 'addFunds' &&
      params?.prevRoute === 'bankAccountsScreen'
    ) {
      navigate('addFundStep1Screen', params);
    } else {
      navigate('dashBoardScreen');
    }
  };

  const initialValues = {
    idType: '',
    idImageName: '',
    idImagePath: '',
    homeValidationType: '',
    homeValidationImageName: '',
    homeValidationImagePath: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async value => {
      try {
        const res = await validateUserIdentityDetails({
          idType: value.idType,
          idImageName: value.idImageName,
          idImagePath: value.idImagePath,
          homeValidationType: value.homeValidationType,
          homeValidationImageName: value.homeValidationImageName,
          homeValidationImagePath: value.homeValidationImagePath,
        }).unwrap();
        if (
          params.type === 'addFunds' &&
          params?.prevRoute === 'bankAccountsScreen'
        ) {
          navigate('addFundStep1Screen', params);
        }
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object().shape({
      idType: Yup.string().required('Required'),
      idImageName: Yup.string().required('Required'),
      idImagePath: Yup.string().required('Required'),
      homeValidationType: Yup.string().required('Required'),
      homeValidationImageName: Yup.string().required('Required'),
      homeValidationImagePath: Yup.string().required('Required'),
    }),
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
      <VStack px="20px" bg={colors.bg} flex={1} py={4}>
        <CustomActionsheetList
          title="Select ID Type"
          value={values.idType}
          items={idTypes}
          placeholder="Select ID Type"
          onChange={item => {
            setFieldValue('idType', item.value);
          }}
          error={errors.idType}
        />
        <FundUploadCard
          my="20px"
          onPress={() => {
            setIsOpenIdentityActionsSheet(true);
          }}
          title={
            formik.values.idImagePath && formik.values.idImagePath.length > 0
              ? 'Upload Completed'
              : 'Upload ID Type'
          }
          subTitle={errors.idImagePath}
        />

        <CustomActionsheetList
          title="Confirm Home Address"
          value={values.homeValidationType}
          placeholder="Confirm Home Address"
          items={homeAddress}
          onChange={item => {
            setFieldValue('homeValidationType', item.value);
          }}
        />
        <FundUploadCard
          my="20px"
          onPress={() => {
            setIsOpenHomeAddressActionsSheet(true);
          }}
          title={
            formik.values.homeValidationImagePath &&
            formik.values.homeValidationImagePath.length > 0
              ? 'Upload Completed'
              : 'Upload Home Address'
          }
          subTitle={errors.homeValidationImagePath}
        />

        <VStack mb="20px">
          <GradientButton onPress={handleSubmit}>
            Yes! We Are Done
          </GradientButton>
        </VStack>
        <TextButton
          onPress={handleSkip}
          mb="20px"
          title="Skip for now"
          fontSize="md"
        />
      </VStack>
      <ImageUploader
        isOpen={isOpenIdentityActionsSheet}
        onClose={() => {
          setIsOpenIdentityActionsSheet(false);
        }}
        onImageUpload={(name, path) => {
          setFieldValue('idImageName', name);
          setFieldValue('idImagePath', path);
          setIsOpenIdentityActionsSheet(false);
        }}
      />
      <ImageUploader
        isOpen={isOpenHomeAddressActionsSheet}
        onClose={() => {
          setIsOpenHomeAddressActionsSheet(false);
        }}
        onImageUpload={(name, path) => {
          setFieldValue('homeValidationImageName', name);
          setFieldValue('homeValidationImagePath', path);
          setIsOpenHomeAddressActionsSheet(false);
        }}
      />
      <LoaderModal isLoading={validateUserIdentityResponse.isLoading} />
    </KeyboardAwareView>
  );
}

const identityDetailsScreen = asRoute(
  IdentityDetailsScreen,
  'identityDetailsScreen',
  {
    title: 'Identity Details',
  },
);

export default identityDetailsScreen;
