import React, { useState } from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import { VStack } from 'native-base';
import useNavigate from '@hooks/useNavigate';
import ProfileCard from '@layouts/ProfileCard/ProfileCard';
import ProfileSettingCard from '@components/ProfileSettingCard/ProfileSettingCard';
import { settingsData } from '@appData/settingsData';
import { IProfileSettings } from '@components/ProfileSettingCard/ProfileSettingCard.types';
import NotificationCard from '@components/NotificationCard/NotificationCard';
import { notificationData } from '@appData/notificationData';

function NotificationScreen() {
    const [selectedNotifications, setSelectedNotifications] = useState([
        'General Notification', 'Vibrate'
    ]);

    return (
        <KeyboardAwareView>
            <VStack p="20px" space="4">
                <VStack bg="#ffffff" p="20px" borderRadius="8px">
                    {notificationData?.map((notification, index) => (
                        <NotificationCard
                            title={notification.title}
                            icon={notification.icon}
                            selectedNotifications={selectedNotifications}
                            setSelectedNotifications={setSelectedNotifications}
                            key={index}
                        />
                    ))}
                </VStack>
            </VStack>
        </KeyboardAwareView>
    );
}

const notificationScreen = asRoute(NotificationScreen, 'notificationScreen', {
    title: 'Notification',
});

export default notificationScreen;
