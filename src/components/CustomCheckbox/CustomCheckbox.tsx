import { LinGrad } from '@components/FactoryComponents/FactoryComponents';
import colors, { gradient } from '@theme/colors';
import { Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { ICustomCheckbox } from './CustomCheckbox.types';
import Feather from 'react-native-vector-icons/Feather'

export default function CustomCheckbox({
    title,
    value,
    ...rest
}: ICustomCheckbox) {
    return (
        <Pressable {...rest} flexDirection="row" alignItems="center">
            {value ? <LinGrad
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={gradient.upper}
                mr="20px"
                borderRadius="sm"
                h="20px"
                justifyContent="center"
                alignItems="center"
                w="20px">
                <Feather name="check" color="#ffffff" size={14} />
            </LinGrad> : <VStack mr="20px" h="20px" w="20px" borderRadius="sm" borderWidth={1} borderColor={colors.gray[0]} />}
            <Text color={colors.gray[0]} fontSize="sm">
                {title}
            </Text>
        </Pressable>
    );
}
