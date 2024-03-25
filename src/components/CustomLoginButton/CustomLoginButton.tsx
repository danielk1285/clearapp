import {PressableProps} from '@typedef/native-base.types';
import {Pressable, Text} from 'native-base';
import React from 'react';

import colors from '@theme/colors';
import {AppleIcon, FacebookIcon, GoogleIcon} from '../../../assets/svg/icons';

interface ICustomButton extends PressableProps {
  title: string;
  name: string;
}

const socialIcons: {
  [key: string]: React.FC;
} = {
  apple: AppleIcon,
  google: GoogleIcon,
  facebook: FacebookIcon,
};

export default function CustomLoginButton({
  title,
  name,
  ...rest
}: ICustomButton) {
  const Icon = socialIcons?.[name] || null;

  return (
    <Pressable
      flexDirection="row"
      {...rest}
      borderRadius="8px"
      p={4}
      bg="white"
      justifyContent={'center'}
      alignItems="center">
      {Icon ? <Icon /> : null}
      <Text ml="10px" color={colors.gray[0]} fontWeight={500} fontSize="md">
        {title}
      </Text>
    </Pressable>
  );
}
