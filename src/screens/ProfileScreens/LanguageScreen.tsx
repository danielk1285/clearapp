import {languageData} from '@appData/languageData';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import LanguageCard from '@layouts/LanguageCard/LanguageCard';
import colors from '@theme/colors';
import asRoute from 'hoc/asRoute';
import {Text, VStack} from 'native-base';
import React, {useState} from 'react';

function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  return (
    <KeyboardAwareView>
      <VStack p="20px" space="4">
        <Text color={colors.black} variant="h2">
          Suggested
        </Text>
        <VStack p="20px" bg="#ffffff" borderRadius="8px">
          {languageData.map((language, index) => {
            if (index < 2) {
              return (
                <LanguageCard
                  key={index}
                  title={language}
                  onPress={() => setSelectedLanguage(language)}
                  isActive={language === selectedLanguage}
                />
              );
            }
          })}
        </VStack>
        <Text color={colors.black} variant="h2">
          Language
        </Text>
        <VStack p="20px" bg="#ffffff" borderRadius="8px">
          {languageData.map((language, index) => {
            if (index > 1) {
              return (
                <LanguageCard
                  key={index}
                  title={language}
                  onPress={() => setSelectedLanguage(language)}
                  isActive={language === selectedLanguage}
                />
              );
            }
          })}
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}

const languageScreen = asRoute(LanguageScreen, 'languageScreen', {
  title: 'Language',
});

export default languageScreen;
