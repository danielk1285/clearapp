import { exchangeSummary } from '@appData/myWallet';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import ExchangeSummaryCard from '@layouts/ExchangeSummaryCard/ExchangeSummaryCard';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import WithdrawSummaryCard from '@layouts/WithdrawSummaryCard/WithdrawSummaryCard';
import { useRoute } from '@react-navigation/native';
import { useInitiateWithdrawalMutation } from '@store/avpiV2/userApiSlice';
import auth from '@react-native-firebase/auth';
import asRoute from 'hoc/asRoute';
import { VStack } from 'native-base';
import React, { useEffect } from 'react';

function WithdrawSummaryScreen() {
    const navigate = useNavigate();

    const userId = auth().currentUser?.uid;
    // const { currency, amount, transferTo } = useRoute().params as any;
    const params = useRoute().params as { currency: string, amount: string, transferTo: string };

    const [initiateWithdrawal, WithdrawalResult] = useInitiateWithdrawalMutation();

    const { currency, amount, transferTo } = params;
    
    useEffect(() => {
        // Check the result of the mutation
        if (WithdrawalResult.isSuccess) {
            console.log('Withdrawal Successful');
            navigate('withdrawProgressScreen');
        } else if (WithdrawalResult.isError) {
            console.error('Withdrawal Failed:', WithdrawalResult.error);
        }
    }, [WithdrawalResult, navigate]);

    const handleToWithdraw = () => {
        // Make sure to parse the amount as a float
        initiateWithdrawal({
            uid: userId,
            amount: parseFloat(amount),
            currency,
            transferTo,
        });
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
