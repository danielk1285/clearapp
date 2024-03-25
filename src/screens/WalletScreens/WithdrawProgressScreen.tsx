import { exchangeSummary } from '@appData/myWallet';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import ExchangeSummaryCard from '@layouts/ExchangeSummaryCard/ExchangeSummaryCard';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import WithdrawSummaryCard from '@layouts/WithdrawSummaryCard/WithdrawSummaryCard';
import asRoute from 'hoc/asRoute';
import { Text, VStack } from 'native-base';
import React from 'react';
import withdrawProgress from '@assets/svg/withdrawProgress.svg';
import VectorImage from 'react-native-vector-image';
import { Dimensions, StyleSheet } from 'react-native';
import colors from '@theme/colors';
const { width } = Dimensions.get('window');

function WithdrawProgressScreen() {
    const navigate = useNavigate();

    const handleToWithdraw = () => {
        navigate('dashBoardScreen');
    };

    return (
        <KeyboardAwareView>
            <VStack p="20px" space="20" alignItems="center">
                <VStack maxW={'250px'} width={width * 0.9} height={width * 0.6} alignItems="center">
                    <VectorImage source={withdrawProgress} style={styles.image} />
                    <Text color={colors.black} variant="h2">
                        Withdraw in progress
                    </Text>
                </VStack>
                <GradientButton mt="20px" onPress={handleToWithdraw}>
                    Withdraw
                </GradientButton>
            </VStack>
        </KeyboardAwareView>
    );
}


const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});

const withdrawProgressScreen = asRoute(
    WithdrawProgressScreen,
    'withdrawProgressScreen',
    {
        title: 'Withdraw',
    },
);

export default withdrawProgressScreen;
