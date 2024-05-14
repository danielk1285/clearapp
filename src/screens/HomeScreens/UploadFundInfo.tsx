import ChangeTextColor from '@components/ChangeTextColor/ChangeTextColor';
import GradientButton from '@components/GradientButton';
import useDocumentPicker from '@hooks/useDocumentPicker';
import LoaderModal from '@layouts/LoaderModal.tsx/LoaderModal';
import useNavigate from '@hooks/useNavigate';
import FundUploadCard from '@layouts/FundUploadCard/FundUploadCard';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {Button, Image, VStack} from 'native-base';
import React from 'react';
import asRoute from 'hoc/asRoute';
import {useRoute} from '@react-navigation/native';
import {
  IAddFunds,
  IBankAccountData,
  ITransectionData,
} from '@typedef/common.types';
import {useFormik} from 'formik';
import {useInsertImageMutation} from '@store/apis';
import ImageUploader from '@layouts/ImageUploader';
import TextButton from '@components/TextButton/TextButton';
import * as Yup from 'yup';
import colors from '@theme/colors';
import {firebase} from '@react-native-firebase/auth';
import {useHandleTransactionsdsMutation} from '@store/avpiV2/userApiSlice';
import storage from '@react-native-firebase/storage';

function UploadFundInfoScreen() {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [uploadImageFn, uploadImageResult] = useInsertImageMutation();

  const [addFundsFn, addFundsRes] = useHandleTransactionsdsMutation();

  const params = useRoute().params as ITransectionData & {
    bankAccount: IBankAccountData;
  };

  const initialValues = {
    imageName: '',
    imageUri: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      const {url} = await uploadImageFn({
        image: values.imageUri,
        imageName: values.imageName,
        folderName: 'bank',
      }).unwrap();
      // const imageRef = storage().ref('bank/' + values.imageName);
      // await imageRef.putFile(values.imageUri);

      // const url = await imageRef.getDownloadURL();
      // console.log({url});
      console.log('UploadFundInfo url', {url});
      const userId = firebase.auth().currentUser?.uid;
      console.log('UploadFundInfo userId', {userId});
      try {
        const uploadFundsData: any = {
          action: 'Transfer',
          currency: params.fromCurrency.currencyCode.toUpperCase() as any,
          userId: userId as any,
          amountToSend: params.fromAmount,
          sendingBankRef: params.bankAccount.id,
          verificationImageLink: url,
        };
        console.log('UploadFundInfo uploadFundsData', {uploadFundsData});
        const res = await addFundsFn(uploadFundsData).unwrap();
        console.log('UploadFundInfo res', {res});
        navigate('dashBoardScreen');
      } catch (error) {
        console.log('UploadFundError', {error});
      }
    },
    validationSchema: Yup.object().shape({
      imageUri: Yup.string().required('Image is required'),
    }),
  });

  const {values, errors, setFieldValue, handleSubmit} = formik;

  const handleToContinue = () => {
    navigate('dashBoardScreen');
  };

  return (
    <KeyboardAwareView>
      <VStack px="20px" space={4}>
        <FundUploadCard
          mt="20px"
          mb={'10px'}
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

        <ChangeTextColor
          text="Grab a screenshot of the transfer, or email us a bank confirmation the transfer is on its way"
          colorText="email us"
        />

        <VStack mt="10px" mb="15px" space="7">
          <GradientButton onPress={handleSubmit}>
            Upload Confirmation
          </GradientButton>
          <TextButton onPress={handleToContinue} title="Complete later" />
        </VStack>
        <LoaderModal
          isLoading={addFundsRes.isLoading || uploadImageResult.isLoading}
        />
      </VStack>
    </KeyboardAwareView>
  );
}

const uploadFundInfoScreen = asRoute(
  UploadFundInfoScreen,
  'uploadFundInfoScreen',
  {
    title: 'Upload Fund Info',
  },
);

export default uploadFundInfoScreen;
