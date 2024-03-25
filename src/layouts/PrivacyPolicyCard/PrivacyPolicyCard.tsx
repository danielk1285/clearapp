import { Text, VStack } from "native-base";
import React from "react";
import { IPrivacyPolicyCard } from "./PrivacyPolicyCard.types";
import colors from "@theme/colors";

export default function PrivacyPolicyCard({ privacyPolicy, index }: IPrivacyPolicyCard) {
    return (
        <VStack bg="#ffffff" py="16px" px="12px" space="4" borderRadius="8px">
            <Text fontSize="lg" fontWeight={600} color={colors.black}>{index + 1}. {privacyPolicy.title}</Text>
            <Text color={colors.gray[0]}>{privacyPolicy.subTitle}</Text>
        </VStack>
    );
}
