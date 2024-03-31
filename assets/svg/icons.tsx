import React from 'react';
import VectorImage from 'react-native-vector-image';
import appleIcon from './apple.svg';
import googleIcon from './google.svg';
import facebookIcon from './facebook.svg';
import dollar from './dollar-square.svg';
import dualArrow from './dual-arrow.svg';
import pencil from './pencil.svg';
import home from './home.svg';
import homeFill from './home-fill.svg';
import wallet from './wallet.svg';
import walletFill from './wallet-fill.svg';
import profile from './profile.svg';
import profileFill from './profile-fill.svg';
import clock from './clock.svg';
import swap from './swap.svg';
import selectedCheck from './selectedCheck.svg';
import deselectedCheck from './deselectedCheck.svg';
import usdcoin from './usdcoin.svg';
import transmitsquare from './transmitsquare.svg';
import brifecasetick from './brifecasetick.svg';
import downarrow from './downarrow.svg';
import addAccountIcon from './add-account.svg';
import copy from './copy.svg';
import share from './share.svg';
import upload from './upload.svg';
import calendar from './calendar.svg';
import moneySend from './money-send.svg';
import moneyExchange from './money-exchange.svg';
import threeDots from './threeDots.svg';
import exchangeSummary from './exchangeSummary.svg';
import withdrawProgress from './withdrawProgress.svg';
import editProfile from './editProfile.svg';
import notification from './notification.svg';
import language from './language.svg';
import fingerPrint from './fingerPrint.svg';
import darkTheme from './darkTheme.svg';
import privacyPolicy from './privacyPolicy.svg';
import helpSupport from './helpSupport.svg';
import contactUs from './contactUs.svg';
import logout from './logout.svg';
import rightArrow from './rightArrow.svg';
import sound from './sound.svg';
import vibrate from './vibrate.svg';
import appUpdates from './appUpdates.svg';
import billRemainder from './billRemainder.svg';
import promotion from './promotion.svg';
import discountAvailable from './discountAvailable.svg';
import paymentRequest from './paymentRequest.svg';
import newServiceAvailable from './newServiceAvailable.svg';
import newTipsAvailable from './newTipsAvailable.svg';
import rememberMe from './rememberMe.svg';
import faceId from './faceId.svg';
import biometricId from './biometricId.svg';
import googleAuthenticator from './googleAuthenticator.svg';
import changePassword from './changePassword.svg';
import changePin from './changePin.svg';
import ownership from './ownership.svg';
import arrow from './arrow.svg';
import close from './close.svg';
import plus from './plus.svg';
//FIX: Change back to VectorImage
type TVectorImage = React.ComponentProps<typeof VectorImage>;
export type TIcon = Omit<TVectorImage, 'source'>;

export const AppleIcon = (props: TIcon) => (
  <VectorImage {...props} source={appleIcon} />
);
export const GoogleIcon = (props: TIcon) => (
  <VectorImage {...props} source={googleIcon} />
);
export const FacebookIcon = (props: TIcon) => (
  <VectorImage {...props} source={facebookIcon} />
);
export const Dollar = (props: TIcon) => (
  <VectorImage {...props} source={dollar} />
);

export const DualArrow = (props: TIcon) => (
  <VectorImage {...props} source={dualArrow} />
);
export const Pencil = (props: TIcon) => (
  <VectorImage {...props} source={pencil} />
);

export const HomeIcon = (props: TIcon) => (
  <VectorImage {...props} source={home} />
);

export const HomeFillIcon = (props: TIcon) => (
  <VectorImage {...props} source={homeFill} />
);

export const WalletIcon = (props: TIcon) => (
  <VectorImage {...props} source={wallet} />
);

export const WalletFillIcon = (props: TIcon) => (
  <VectorImage {...props} source={walletFill} />
);

export const ProfileIcon = (props: TIcon) => (
  <VectorImage {...props} source={profile} />
);

export const ProfileFillIcon = (props: TIcon) => (
  <VectorImage {...props} source={profileFill} />
);

export const ClockIcon = (props: TIcon) => (
  <VectorImage {...props} source={clock} />
);

export const SwapIcon = (props: TIcon) => (
  <VectorImage {...props} source={swap} />
);

export const SelectedCheck = (props: TIcon) => (
  <VectorImage {...props} source={selectedCheck} />
);

export const DeselectedCheck = (props: TIcon) => (
  <VectorImage {...props} source={deselectedCheck} />
);

export const USDCoin = (props: TIcon) => (
  <VectorImage {...props} source={usdcoin} />
);

export const TransmitSquare = (props: TIcon) => (
  <VectorImage {...props} source={transmitsquare} />
);

export const Brifecasetick = (props: TIcon) => (
  <VectorImage {...props} source={brifecasetick} />
);

export const DownArrow = (props: TIcon) => (
  <VectorImage {...props} source={downarrow} />
);

export const AddAccountIcon = (props: TIcon) => (
  <VectorImage {...props} source={addAccountIcon} />
);

export const CopyIcon = (props: TIcon) => (
  <VectorImage {...props} source={copy} />
);

export const ShareIcon = (props: TIcon) => (
  <VectorImage {...props} source={share} />
);

export const UploadIcon = (props: TIcon) => (
  <VectorImage {...props} source={upload} />
);

export const CalendarIcon = (props: TIcon) => (
  <VectorImage {...props} source={calendar} />
);

export const MoneySend = (props: TIcon) => (
  <VectorImage {...props} source={moneySend} />
);

export const MoneyExchange = (props: TIcon) => (
  <VectorImage {...props} source={moneyExchange} />
);

export const ThreeDots = (props: TIcon) => (
  <VectorImage {...props} source={threeDots} />
);

export const ExchangeSummaryIcon = (props: TIcon) => (
  <VectorImage {...props} source={exchangeSummary} />
);

export const WithdrawProgressIcon = (props: TIcon) => (
  <VectorImage {...props} source={withdrawProgress} />
);

export const EditProfileIcon = (props: TIcon) => (
  <VectorImage {...props} source={editProfile} />
);

export const NotificationIcon = (props: TIcon) => (
  <VectorImage {...props} source={notification} />
);

export const LanguageIcon = (props: TIcon) => (
  <VectorImage {...props} source={language} />
);

export const FingerPrintIcon = (props: TIcon) => (
  <VectorImage {...props} source={fingerPrint} />
);

export const DarkThemeIcon = (props: TIcon) => (
  <VectorImage {...props} source={darkTheme} />
);

export const PrivacyPolicyIcon = (props: TIcon) => (
  <VectorImage {...props} source={privacyPolicy} />
);

export const HelpSupportIcon = (props: TIcon) => (
  <VectorImage {...props} source={helpSupport} />
);

export const ContactUsIcon = (props: TIcon) => (
  <VectorImage {...props} source={contactUs} />
);

export const LogoutIcon = (props: TIcon) => (
  <VectorImage {...props} source={logout} />
);

export const RightArrowIcon = (props: TIcon) => (
  <VectorImage {...props} source={rightArrow} />
);

export const SoundIcon = (props: TIcon) => (
  <VectorImage {...props} source={sound} />
);

export const VibrateIcon = (props: TIcon) => (
  <VectorImage {...props} source={vibrate} />
);

export const AppUpdatesIcon = (props: TIcon) => (
  <VectorImage {...props} source={appUpdates} />
);

export const BillRemainderIcon = (props: TIcon) => (
  <VectorImage {...props} source={billRemainder} />
);

export const PromotionIcon = (props: TIcon) => (
  <VectorImage {...props} source={promotion} />
);

export const DiscountAvailableIcon = (props: TIcon) => (
  <VectorImage {...props} source={discountAvailable} />
);

export const PaymentRequestIcon = (props: TIcon) => (
  <VectorImage {...props} source={paymentRequest} />
);

export const NewServiceAvailableIcon = (props: TIcon) => (
  <VectorImage {...props} source={newServiceAvailable} />
);

export const NewTipsAvailableIcon = (props: TIcon) => (
  <VectorImage {...props} source={newTipsAvailable} />
);

export const RememberMeIcon = (props: TIcon) => (
  <VectorImage {...props} source={rememberMe} />
);

export const FaceIdIcon = (props: TIcon) => (
  <VectorImage {...props} source={faceId} />
);

export const BiometricIdIcon = (props: TIcon) => (
  <VectorImage {...props} source={biometricId} />
);

export const GoogleAuthenticatorIcon = (props: TIcon) => (
  <VectorImage {...props} source={googleAuthenticator} />
);

export const ChangePassswordIcon = (props: TIcon) => (
  <VectorImage {...props} source={changePassword} />
);

export const ChangePinIcon = (props: TIcon) => (
  <VectorImage {...props} source={changePin} />
);

export const OwnershipIcon = (props: TIcon) => (
  <VectorImage {...props} source={ownership} />
);
export const ArrowIcon = (props: TIcon) => (
  <VectorImage {...props} source={arrow} />
);
export const CloseIcon = (props: TIcon) => (
  <VectorImage {...props} source={close} />
);
export const PlusIcon = (props: TIcon) => (
  <VectorImage {...props} source={plus} />
);

export const EmptyIcon = (props: TIcon) => <></>;
