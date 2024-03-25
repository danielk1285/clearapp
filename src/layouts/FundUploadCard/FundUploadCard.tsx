import { UploadIcon } from '@assets/svg/icons';
import colors from '@theme/colors';
import { Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { IFundUploadCard } from './FundUploadCard.types';

export default function FundUploadCard({
    title = '',
    subTitle = '',
    ...rest
}: IFundUploadCard) {
    return (
        <Pressable
            {...rest}
            bg="white"
            rounded="8px"
            h="148px"
            alignItems="center"
            justifyContent="center">
            <UploadIcon style={{ marginBottom: 16 }} />
            {title && <Text mb="16px" color={colors.gray[1]} fontSize="md">{title}</Text>}
            {subTitle && <Text color={colors.primary} fontSize="sm" fontWeight={500}>{subTitle}</Text>}
        </Pressable>
    );
}
