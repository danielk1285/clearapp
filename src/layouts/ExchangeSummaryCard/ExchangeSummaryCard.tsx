import { ExchangeSummaryIcon } from "@assets/svg/icons";
import colors from "@theme/colors";
import { HStack, Text } from "native-base";
import React from "react";
import { IExchangeSummaryCard } from "./ExchangeSummaryCard.types";

const icons: {
    [key: string]: any;
} = {
    exchangeSummaryIcon: (props: any) => <ExchangeSummaryIcon {...props} />,
};

export default function ExchangeSummaryCard({ exchangeSummary }: IExchangeSummaryCard) {
    const Icon = icons[exchangeSummary.icon];
    return (
        <HStack space="3" alignItems="center" maxW="90%" my="10px">
            <Icon />
            <Text color={colors.gray[0]}>{exchangeSummary.summary}</Text>
        </HStack>
    );
}
