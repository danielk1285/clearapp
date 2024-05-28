import ActionsheetModal from '@actionSheets/ActionsheetModal/ActionsheetModal';
import {settingsData} from '@appData/settingsData';
import ProfileSettingCard from '@components/ProfileSettingCard/ProfileSettingCard';
import useNavigate from '@hooks/useNavigate';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import LogoutModalCard from '@layouts/LogoutModalCard/LogoutModalCard';
import ProfileCard from '@layouts/ProfileCard/ProfileCard';
import asRoute from 'hoc/asRoute';
import {VStack, useDisclose} from 'native-base';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { Alert, Linking, Text } from 'react-native';
import { set } from 'lodash';

function ProfileScreen() {
  const {onClose, onOpen, isOpen} = useDisclose();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const [profileData, setProfileData] = useState({
    name: '',
    gmail: '',
    profilePic: '',
  });
  const [whatsappError, setWhatsappError] = useState(false);

  React.useEffect(() => {
    const userData = auth().currentUser;
    if (userData) {
      setProfileData({
        name: userData.displayName,
        gmail: userData.email,
        profilePic: userData.photoURL,
      });
    }
  }, []);

  console.log('profileScreen');

  const handleSettingsPress = (route: string, index: number) => {
    if (route) {
      navigate(route);
    }
    if (index + 2 === settingsData?.length) {
      console.log('help and support');
      openWhatsApp();  // This will open WhatsApp to the specified number
    }
    
    else if (index + 1 === settingsData?.length) {
      onOpen();
    }
  };

  const openWhatsApp = async () => {
    try {
    let url = 'whatsapp://send?phone=18082659720';
      Linking.openURL(url);
  } catch (error) {
    console.log('An error occurred', error);
    Alert.alert('Error', 'WhatsApp is not installed');
    setWhatsappError(true);
  }
  };
  

  const handleLogout = () => {
    console.log('logged out');
    auth().signOut();
    onClose();
  };

  return (
    <KeyboardAwareView>
      <VStack p="20px" space="4">
        <ProfileCard
          profilePic={profileData.profilePic}
          name={profileData.name}
          gmail={profileData.gmail}
        />
        <VStack borderRadius="8px" bg="#ffffff" p="20px">
          {settingsData.map((profileSettingsData, index) => (
            <ProfileSettingCard
              isActive={theme === 'dark'}
              onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              data={profileSettingsData}
              onPress={() =>
                handleSettingsPress(profileSettingsData.route, index)
              }
              key={index}
            />
          ))}
          <Text>Please install WhatsApp</Text>
        </VStack>
      </VStack>
      <ActionsheetModal onClose={onClose} isOpen={isOpen}>
        <LogoutModalCard onClose={onClose} handleLogout={handleLogout} />
      </ActionsheetModal>
    </KeyboardAwareView>
  );
}

const profileScreen = asRoute(ProfileScreen, 'profileScreen', {
  title: 'Settings',
});

export default profileScreen;
