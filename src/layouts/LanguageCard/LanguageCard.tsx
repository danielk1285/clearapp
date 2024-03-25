import CustomRadioButton from '@components/CustomRadioButton/CustomRadioButton';
import { Pressable, Text } from 'native-base';
import React from 'react';
import { ILanguageCard } from './LanguageCard.types';
import colors from '@theme/colors';

export default function LanguageCard({
    title,
    isActive,
    ...rest
}: ILanguageCard) {
    return (
        <Pressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            py="10px"
            {...rest}>
            <Text fontSize="lg" fontWeight={500} color={colors.gray[0]}>{title}</Text>
            <CustomRadioButton isActive={isActive} />
        </Pressable>
    );
}
