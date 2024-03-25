import colors from '@theme/colors';
import { Text, VStack } from 'native-base';
import React from 'react';
import { IAddAccount } from './AddAccount.types';

export default function AddAccount({ title, subTitle, icon }: IAddAccount) {
    return (
        <VStack flex={1} mx="40px" alignItems="center" justifyContent="center" space="5">
            {icon}
            <Text textAlign="center" color={colors.black} fontSize="lg" fontWeight={700}>
                {title}
            </Text>
            <Text fontSize="sm" color={colors.gray[0]} textAlign="center">{subTitle}</Text>
        </VStack>
    );
}
