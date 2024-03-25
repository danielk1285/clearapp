import { H2 } from "@components/Headings/Headings";
import colors from "@theme/colors";
import { Text, VStack } from "native-base";
import React from "react";

export default function ImportantNote({ title, subTitle }: { title: string, subTitle: string }) {
    return (
        <VStack>
            <Text color={colors.black} variant="h2">{title}</Text>
            <Text mt="16px" color={colors.gray[0]} fontSize="md">{subTitle}</Text>
        </VStack>
    );
}
