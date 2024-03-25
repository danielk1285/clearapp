import colors from "@theme/colors";
import { HStack, Text, VStack } from "native-base";
import React from "react";
import { IWithdrawSummaryCard } from "./WithdrawSummaryCard.types";

export default function WithdrawSummaryCard({ title, amount, currency, transferTo }: IWithdrawSummaryCard) {
    return (
        <VStack bg="#ffffff" py="20px" px="16px" borderRadius="8px">
            <Text color={colors.black} variant="h2">{title}</Text>
            <VStack borderWidth={1} borderStyle="dashed" my="20px" borderColor={colors.gray[3]} />
            <HStack justifyContent="space-between">
                <VStack space="3">
                    <Text color={colors.black} variant="h3">Currency</Text>
                    <Text color={colors.black} variant="h3">Amount</Text>
                    <Text color={colors.black} variant="h3">Transfer to</Text>
                </VStack>
                <VStack space="3">
                    <Text color={colors.gray[0]}>{currency}</Text>
                    <Text color={colors.gray[0]}>{amount}</Text>
                    <Text color={colors.gray[0]}>{transferTo}</Text>
                </VStack>
            </HStack>
        </VStack>
    );
}
