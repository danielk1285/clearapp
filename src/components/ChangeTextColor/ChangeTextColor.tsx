import colors from "@theme/colors";
import { Text } from "native-base";
import React from "react";

export default function ChangeTextColor({ text, colorText }: { text: string; colorText: string }) {
    const splitText = text.split(colorText);

    return (
        <Text color={colors.gray[0]} fontSize="sm">
            {splitText[0]}{''}
            <Text color={colors.primary} fontSize="sm" underline>{colorText}</Text>{splitText[1]}
        </Text>
    )
}
