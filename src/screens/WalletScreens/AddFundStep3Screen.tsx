import React from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {Button, Image, Text, VStack} from 'native-base';
import useNavigate from '@hooks/useNavigate';
import {useFormik} from 'formik';
import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import TextButton from '@components/TextButton/TextButton';
import colors from '@theme/colors';
import {OwnershipIcon} from '@assets/svg/icons';
import {useRoute} from '@react-navigation/native';
import FundUploadCard from '@layouts/FundUploadCard/FundUploadCard';
import ImageUploader from '@layouts/ImageUploader';
import * as Yup from 'yup';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {ITransectionData} from '@typedef/common.types';
import {selectAddBank} from '@store/features/addBankSlice';
import {useAddBankAccountMutation} from '@store/apis/bankAccounntsApi';
import LoaderModal from '@layouts/LoaderModal.tsx/LoaderModal';
import {useInsertImageMutation} from '@store/apis';
import {useCreateOrUpdateUserMutation} from '@store/avpiV2/userApiSlice';
import auth, {firebase} from '@react-native-firebase/auth';
import axios from 'axios';
import {selectUser} from '@store/features/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { replaceUndefinedWithNull } from '@utils/replaceUndefinedWithNull';

interface ITransectionDataWithBank extends ITransectionData {
  bankCountry?: string;
}

function AddFundStep3Screen() {
  const navigate = useNavigate();
  const params = useRoute().params as ITransectionDataWithBank & {bankFormData: any};
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [addBankFn, {isLoading, ...others}] = useAddBankAccountMutation();
  const [uploadImageFn, uploadImageResult] = useInsertImageMutation();

  // console.log(others);

  const previousFormData = useSelector(selectAddBank);

  const [showUploadModal, setShowUploadModal] = React.useState(false);

  const initialValues = {
    imageName: '',
    imageUri: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      const {data} = await uploadImageFn({
        image: values.imageUri,
        imageName: values.imageName,
        folderName: 'bank',
      }).unwrap();

      const id = uuid.v4();

      const verificationImageLink = data;
      const bankForm = {
        id,
        ...params.bankFormData,
        verificationImageLink,
        verificationStatus: 'Pending',
        bankCountry: params.bankCountry
      };

      const token = await auth().currentUser?.getIdToken(true);
      const fcmToken = await AsyncStorage.getItem('pushToken');
      const uid = auth().currentUser?.uid;
      const username = user?.username;

      try {
        const bankFormClean = replaceUndefinedWithNull(bankForm);
        const res = await addBankFn(bankFormClean).unwrap();
        console.log(res);

         const type = params?.type;
         const newParams = { ...params, key: Date.now() };
         if (type === 'addFunds') {
           navigate('accountListScreen', newParams);
         } else {
           navigate('myWalletScreen',newParams);
         }
      } catch (error) {
        alert('Something went wrong');
        console.log({error});
      }
    },
    validationSchema: Yup.object().shape({
      imageUri: Yup.string().required('Image is required'),
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

  const handleToContinue = () => {
    navigate('myWalletScreen');
  };

  return (
    <KeyboardAwareView>
      <VStack p="20px" justifyContent="space-between" flex={1}>
        <VStack
          alignItems="center"
          justifyContent="center"
          px="20px"
          mt="30px"
          space="4"
          mb={10}>
          <OwnershipIcon />
          <VStack space="2">
            <Text
              textAlign="center"
              fontSize="xl"
              fontWeight={700}
              color={colors.black}>
              Verifying your ownership
            </Text>
            <Text textAlign="center" color={colors.gray[0]}>
              Uploading the ownership documents will make secure of your money
            </Text>
          </VStack>
        </VStack>

        <FundUploadCard
          my="20px"
          onPress={() => {
            setShowUploadModal(true);
          }}
          title={
            formik.values.imageUri && formik.values.imageUri.length > 0
              ? 'Upload Again'
              : 'Upload Home Address'
          }
          subTitle={errors.imageUri}
        />

        {formik.values.imageUri && formik.values.imageUri.length ? (
          <Image
            source={{uri: values.imageUri}}
            alt="image"
            width="100%"
            height="400px"
            resizeMode="cover"
            my="20px"
          />
        ) : null}

        {formik.values.imageUri && formik.values.imageUri.length ? (
          <Button
            onPress={() => {
              setFieldValue('imageName', '');
              setFieldValue('imageUri', '');
            }}
            _text={{color: colors.primary[500]}}
            borderWidth={1}
            borderColor={colors.primary[500]}>
            Clear
          </Button>
        ) : null}

        <ImageUploader
          isOpen={showUploadModal}
          onClose={() => {
            setShowUploadModal(false);
          }}
          onImageUpload={(name, path) => {
            // console.log({name, path});
            setFieldValue('imageName', name);
            setFieldValue('imageUri', path);
            setShowUploadModal(false);
          }}
        />

        <VStack mt="30px" mb="15px" space="7">
          <GradientButton onPress={handleSubmit}>
            Upload Ownership Confirmation
          </GradientButton>
          <TextButton onPress={handleToContinue} title="Complete later" />
        </VStack>
      </VStack>
      <LoaderModal isLoading={isLoading || uploadImageResult.isLoading} />
    </KeyboardAwareView>
  );
}

const addFundStep3Screen = asRoute(AddFundStep3Screen, 'addFundStep3Screen', {
  title: 'Upload Confirmation',
});

export default addFundStep3Screen;
