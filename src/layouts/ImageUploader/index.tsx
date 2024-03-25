import React from 'react';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {Actionsheet, HStack, Pressable, Text, VStack} from 'native-base';

interface IImageUploaderProps {
  onImageUpload: (fileName?: string, uri?: string) => void;
  isOpen: boolean;
  onClose?: () => void;
}

export default function ImageUploader({
  onImageUpload,
  isOpen,
  onClose,
}: IImageUploaderProps) {
  const options = {
    mediaType: 'photo' as MediaType,
    cameraType: 'back',
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary(options);
    // console.log(result);
    if (result.assets) {
      const {fileName, uri} = result.assets[0];
      onImageUpload?.(fileName, uri);
    }
  };

  const handleCameraPicker = async () => {
    const result = await launchCamera(options);
    if (result.assets) {
      const {fileName, uri} = result.assets[0];
      onImageUpload?.(fileName, uri);
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <HStack space={2} alignItems="center" py="4">
          <Pressable
            onPress={handleImagePicker}
            px="20px"
            py="10px"
            borderRadius="10px"
            borderWidth="1px"
            borderColor="gray.400"
            rounded="md">
            <Text>Select Image</Text>
          </Pressable>
          <Pressable
            onPress={handleCameraPicker}
            px="20px"
            py="10px"
            borderRadius="10px"
            borderWidth="1px"
            borderColor="gray.400"
            rounded="md">
            <Text>Take Photo</Text>
          </Pressable>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
