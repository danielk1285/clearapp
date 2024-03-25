import {Factory} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {BoxProps} from '@typedef/native-base.types';

type LinearGradientProps = React.ComponentProps<typeof LinearGradient>;

export const LinGrad = Factory(LinearGradient) as React.FC<
  LinearGradientProps & BoxProps
>;
