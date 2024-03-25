import { VStack } from 'native-base';
import React from 'react';
import { ICustomRadioButton } from './CustomRadioButton.types';
import colors from '@theme/colors';

export default function CustomRadioButton({
    isActive = false,
    circleSize = 25,
    activeColor = colors.primary,
    inActiveColor = colors.gray[1],
}: ICustomRadioButton) {
    return (
        <VStack
            rounded="full"
            alignItems="center"
            justifyContent="center"
            bg="#ffffff"
            h={circleSize.toString() + "px"}
            w={circleSize.toString() + "px"}
            borderWidth={2}
            borderColor={isActive ? activeColor : inActiveColor}
        >
            {isActive ? <VStack rounded="full"
                bg={activeColor}
                h={(circleSize - 10).toString() + "px"}
                w={(circleSize - 10).toString() + "px"} /> : null}
        </VStack>
    );
}
