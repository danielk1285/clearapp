import {Modal, Spinner} from 'native-base';
import React from 'react';
import Lottie from 'lottie-react-native';

export default function LoaderModal({isLoading}: {isLoading: boolean}) {
  return (
    <Modal
      isOpen={isLoading}
      _backdrop={{
        bg: '#fff',
        opacity: 0.1,
      }}>
      <Lottie
        source={require('../../../assets/json/loader.json')}
        autoPlay
        loop
        style={{
          width: 150,
          height: 150,
        }}
        duration={2000}
      />
    </Modal>
  );
}
