import { RightArrowIcon } from '@assets/svg/icons';
import { HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import CardInfo from '@layouts/CardInfo/CardInfo';
import colors from '@theme/colors';
import SwitchToggle from 'react-native-switch-toggle';
import { INotificationCard } from './NotificationCard.types';

export default function NotificationCard({
    title,
    icon,
    selectedNotifications,
    setSelectedNotifications
}: INotificationCard) {
    const handleSelectionChange = () => {
        if (selectedNotifications?.includes(title)) {
            let newSelectedNotification = selectedNotifications?.filter(notification => notification !== title);
            setSelectedNotifications(newSelectedNotification);
        } else {
            setSelectedNotifications([...selectedNotifications, title]);
        }
    }
    return (
        <HStack
            justifyContent="space-between"
            alignItems="center"
            mb="8px">
            <HStack space="6" alignItems="center">
                <CardInfo
                    icon={icon}
                    h="45"
                    w="47"
                    iconStyle={{ tintColor: colors.gray[0], height: 25, width: 25 }}
                />
                <Text mb="6px" fontSize="lg" fontWeight={500} color={colors.gray[0]}>
                    {title}
                </Text>
            </HStack>
            <SwitchToggle
                switchOn={selectedNotifications?.includes(title)}
                onPress={handleSelectionChange}
                circleColorOff="#ffffff"
                circleColorOn="#ffffff"
                backgroundColorOn={colors.primary}
                backgroundColorOff={colors.gray[4]}
                containerStyle={{
                    width: 50,
                    height: 28,
                    borderRadius: 25,
                    padding: 3,
                }}
                circleStyle={{
                    width: 23,
                    height: 23,
                    borderRadius: 15,
                }}
            />
        </HStack>
    );
}
