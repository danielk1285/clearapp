import React, { useState } from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import { Text, VStack } from 'native-base';
import { privacyPolicyData } from '@appData/privacyPolicyData';
import PrivacyPolicyCard from '@layouts/PrivacyPolicyCard/PrivacyPolicyCard';

function PrivacyPolicyScreen() {
    return (
        <KeyboardAwareView>
            <VStack p="20px" space="4">
                {privacyPolicyData.map((privacyPolicy, index) => (
                    <PrivacyPolicyCard
                        key={index}
                        index={index}
                        privacyPolicy={privacyPolicy}
                    />
                ))}
            </VStack>
        </KeyboardAwareView>
    );
}

const privacyPolicyScreen = asRoute(
    PrivacyPolicyScreen,
    'privacyPolicyScreen',
    {
        title: 'Privacy Policy',
    },
);

export default privacyPolicyScreen;
