import React, {useState} from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {VStack} from 'native-base';
import useNavigate from '@hooks/useNavigate';
import ProfileSettingCard from '@components/ProfileSettingCard/ProfileSettingCard';
import {securityData} from '@appData/securityData';
import {Text} from 'react-native';
import localStorage from 'redux-persist/es/storage';
import {checkIfFaceIDEnabled} from '@screens/AuthScreens/FaceID';

const navigationData = ['', '', ''];

function SecurityScreen() {
  const navigate = useNavigate();
  const [securityList, setSecurityList] = useState<string[]>(['Remember Me']);

  const handleSettingsPress = (index: number) => {
    if (navigationData[index]) {
      navigate(navigationData[index]);
    }
  };

  const handleOnToggle = async (security: { title: string }) => {
    // if the item is Face ID call the check for face ID function
    if (security.title === 'Face ID') {
      const faceIDenabled = await checkIfFaceIDEnabled();
      console.log(faceIDenabled);
      if (!faceIDenabled) {
        alert('Face ID is not supported on this device');
        return;
      }
    }
  
    if (securityList?.includes(security.title)) {
      const newList = securityList?.filter(title => title !== security.title);
      setSecurityList(newList);
    } else {
      setSecurityList([...securityList, security.title]);
    }
  
    // Persist the data to LocalStorage
    localStorage.setItem('securityList', JSON.stringify(securityList));
  
    console.log(securityList);
  };

  return (
    <KeyboardAwareView>
      <VStack p="20px">
        <VStack borderRadius="8px" bg="#ffffff" p="20px">
          {securityData.map((security, index) => (
            <ProfileSettingCard
              isActive={securityList.includes(security.title)}
              onToggle={() => handleOnToggle(security)}
              data={security}
              onPress={() => handleSettingsPress(index)}
              key={index}
            />
          ))}
          <Text>{JSON.stringify(securityList)}</Text>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}

const securityScreen = asRoute(SecurityScreen, 'securityScreen', {
  title: 'Security',
});

export default securityScreen;
