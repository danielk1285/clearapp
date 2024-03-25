import { RightArrowIcon } from '@assets/svg/icons';
import { HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { IProfileSettingCard } from './ProfileSettingCard.types';
import CardInfo from '@layouts/CardInfo/CardInfo';
import colors from '@theme/colors';
import SwitchToggle from 'react-native-switch-toggle';

export default function ProfileSettingCard({
    data,
    isActive = false,
    onToggle,
    ...rest
}: IProfileSettingCard) {
    return (
        <Pressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="8px"
            {...rest}>
            <HStack space="4" alignItems="center">
                <CardInfo
                    icon={data.leftIcon}
                    h="37"
                    w="39"
                    mb="0"
                    iconStyle={{ tintColor: colors.gray[0], height: 25, width: 25 }}
                />
                <VStack justifyContent="space-evenly" pb="4px">
                    <Text fontSize="md" fontWeight={500} color={colors.gray[0]}>
                        {data.title}
                    </Text>
                    {data?.subTitle ? <Text fontSize="xs" color={colors.gray[1]}>
                        {data.subTitle}
                    </Text> : null}
                </VStack>
            </HStack>
            {data.rightIcon === 'rightArrow' ? (
                <RightArrowIcon style={{ height: 10, width: 10 }} />
            ) : (
                <SwitchToggle
                    switchOn={isActive}
                    onPress={onToggle}
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
            )}
        </Pressable>
    );
}
