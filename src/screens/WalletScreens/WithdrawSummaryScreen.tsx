import { exchangeSummary } from '@appData/myWallet';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import ExchangeSummaryCard from '@layouts/ExchangeSummaryCard/ExchangeSummaryCard';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import WithdrawSummaryCard from '@layouts/WithdrawSummaryCard/WithdrawSummaryCard';
import { useRoute } from '@react-navigation/native';
import asRoute from 'hoc/asRoute';
import { VStack } from 'native-base';
import React from 'react';

function WithdrawSummaryScreen() {
    const navigate = useNavigate();
    const { currency, amount, transferTo } = useRoute().params as any;

    const handleToWithdraw = () => {
        navigate('withdrawProgressScreen');
    };
    return (
        <KeyboardAwareView>
            <VStack p="20px" space="20">
                <WithdrawSummaryCard
                    title="Withdraw Summary"
                    amount={amount}
                    currency={currency}
                    transferTo={transferTo}
                />
                <GradientButton mt="20px" onPress={handleToWithdraw}>
                    Done
                </GradientButton>
            </VStack>
        </KeyboardAwareView>
    );
}

const withdrawSummaryScreen = asRoute(
    WithdrawSummaryScreen,
    'withdrawSummaryScreen',
    {
        title: 'Summary',
    },
);

export default withdrawSummaryScreen;
