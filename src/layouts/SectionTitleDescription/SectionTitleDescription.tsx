import { H2 } from '@components/Headings/Headings';
import { HStack, Text } from 'native-base';
import React from 'react';
import { ISectionTitleDescriptionProps } from './SectionTitleDescription.types';
import colors from '@theme/colors';

export default function SectionTitleDescription({
  title,
  rightTextProps = {},
  titleProps = {},
  onRightTextPress,
  rightText,
}: ISectionTitleDescriptionProps) {
  return (
    <HStack justifyContent="space-between">
      <Text color={colors.black} variant="h2" {...titleProps}>{title}</Text>
      {rightText ? (
        <Text
          fontSize="sm"
          fontWeight={400}
          ml={'auto'}
          color={colors.primary}
          {...rightTextProps}
          onPress={onRightTextPress}>
          {rightText}
        </Text>
      ) : null}
    </HStack>
  );
}
