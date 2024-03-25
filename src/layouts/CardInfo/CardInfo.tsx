import React from "react";

import { Brifecasetick, USDCoin, TransmitSquare, ClockIcon, Dollar, SwapIcon, MoneySend, MoneyExchange, ContactUsIcon, DarkThemeIcon, EditProfileIcon, FingerPrintIcon, HelpSupportIcon, LanguageIcon, LogoutIcon, NotificationIcon, SoundIcon, VibrateIcon, AppUpdatesIcon, BillRemainderIcon, PromotionIcon, DiscountAvailableIcon, PaymentRequestIcon, NewServiceAvailableIcon, NewTipsAvailableIcon, PrivacyPolicyIcon, RememberMeIcon, FaceIdIcon, BiometricIdIcon, GoogleAuthenticatorIcon, ChangePassswordIcon, ChangePinIcon } from "@assets/svg/icons";
import colors from "@theme/colors";
import { VStack } from "native-base";
import { StyleSheet } from "react-native";
import { ICardInfo } from './CardInfo.types';


const icons: {
    [key: string]: any;
} = {
    USDCoin: (props: any) => <USDCoin {...props} />,
    TransmitSquare: (props: any) => <TransmitSquare {...props} />,
    Brifecasetick: (props: any) => <Brifecasetick {...props} />,
    clock: (props: any) => <ClockIcon {...props} />,
    dollar: (props: any) => <Dollar {...props} />,
    swap: (props: any) => <SwapIcon {...props} />,
    moneySend: (props: any) => <MoneySend {...props} />,
    moneyExchange: (props: any) => <MoneyExchange {...props} />,
    editProfile: (props: any) => <EditProfileIcon {...props} />,
    notification: (props: any) => <NotificationIcon {...props} />,
    language: (props: any) => <LanguageIcon {...props} />,
    fingerPrint: (props: any) => <FingerPrintIcon {...props} />,
    darkTheme: (props: any) => <DarkThemeIcon {...props} />,
    privacyPolicy: (props: any) => <PrivacyPolicyIcon {...props} />,
    helpSupport: (props: any) => <HelpSupportIcon {...props} />,
    contactUs: (props: any) => <ContactUsIcon {...props} />,
    logout: (props: any) => <LogoutIcon {...props} />,
    sound: (props: any) => <SoundIcon {...props} />,
    vibrate: (props: any) => <VibrateIcon {...props} />,
    appUpdates: (props: any) => <AppUpdatesIcon {...props} />,
    billRemainder: (props: any) => <BillRemainderIcon {...props} />,
    promotion: (props: any) => <PromotionIcon {...props} />,
    discountAvailable: (props: any) => <DiscountAvailableIcon {...props} />,
    paymentRequest: (props: any) => <PaymentRequestIcon {...props} />,
    newServiceAvailable: (props: any) => <NewServiceAvailableIcon {...props} />,
    newTipsAvailable: (props: any) => <NewTipsAvailableIcon {...props} />,
    rememberMe: (props: any) => <RememberMeIcon {...props} />,
    faceId: (props: any) => <FaceIdIcon {...props} />,
    biometricId: (props: any) => <BiometricIdIcon {...props} />,
    googleAuthenticator: (props: any) => <GoogleAuthenticatorIcon {...props} />,
    changePassword: (props: any) => <ChangePassswordIcon {...props} />,
    changePin: (props: any) => <ChangePinIcon {...props} />,
};

export default function CardInfo({ icon, iconStyle = {}, ...rest }: ICardInfo) {
    const Icon = icons[icon];
    return (
        <VStack
            alignItems="center"
            justifyContent="center"
            bg="#F6F5FC"
            h="48px"
            w="50px"
            borderRadius="4"
            mb="2"
            {...rest}
        >
            <Icon style={[styles.iconStyle, iconStyle]} />
        </VStack>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        width: 30,
        height: 30,
        tintColor: '#3A41FE',
    },
});
