import React, { useState } from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import { VStack } from 'native-base';
import useNavigate from '@hooks/useNavigate';
import ProfileSettingCard from '@components/ProfileSettingCard/ProfileSettingCard';
import { securityData } from '@appData/securityData';

const navigationData = [
    '',
    '',
    ''
]

function SecurityScreen() {
    const navigate = useNavigate();
    const [securityList, setSecurityList] = useState<string[]>(['Remember Me']);

    const handleSettingsPress = (index: number) => {
        if (navigationData[index]) {
            navigate(navigationData[index]);
        }
    }

    const handleOnToggle = (security) => {
        if (securityList?.includes(security.title)) {
            const newList = securityList?.filter(title => title !== security.title);
            setSecurityList(newList);
        } else {
            setSecurityList([...securityList, security.title]);
        }
        console.log(securityList)
    }


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
                </VStack>
            </VStack>
        </KeyboardAwareView>
    );
}

const securityScreen = asRoute(SecurityScreen, 'securityScreen', {
    title: 'Security',
});

export default securityScreen;
