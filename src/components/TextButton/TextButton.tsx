import colors from '@theme/colors';
import React from 'react';
import { Pressable, Text } from 'native-base';
import { ITextButton } from './TextButton.types';

export default function TextButton({ title, fontSize = "xs", ...rest }: ITextButton) {
    return (
        <Pressable {...rest}>
            <Text
                color={colors.primary}
                // fontWeight={500}
                fontSize={fontSize}
                textAlign="center">
                {title}
            </Text>
        </Pressable>
    );
}
