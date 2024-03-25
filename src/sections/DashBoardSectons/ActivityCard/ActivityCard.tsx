import Card from '@components/Card/Card';
import { H2 } from '@components/Headings/Headings';
import ActivityCardItem from '@components/ActivityCardItem/ActivityCardItem';
import { HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { IActivityCardItem, IActivityCard } from './ActivityCard.types';
import colors from '@theme/colors';

export default function ActivityCard({ title, activityList, numberOfActivity = activityList.length, ...rest }: IActivityCard) {
  const handleViewDetails = ({ activity }: IActivityCardItem) => {
    console.log(activity.status);
  }
  return (
    <Card space="4">
      {title ? <HStack justifyContent="space-between">
        <Text color={colors.black} variant="h2">{title}</Text>
        <Pressable {...rest}>
          <Text fontSize="sm" fontWeight={400} color={colors.primary}>
            See All
          </Text>
        </Pressable>
      </HStack> : null}
      {activityList?.length > 0 ? (
        activityList?.map((activity, index) => {
          if (index < numberOfActivity) {
            return <ActivityCardItem key={activity.id} onPress={() => handleViewDetails({ activity })} activity={activity} />
          }
        })
      ) : (
        <VStack p="4" alignItems="center" justifyContent="center">
          <Text color={colors.primary} fontSize="sm">
            Your activity history will appear here.
          </Text>
        </VStack>
      )}
    </Card>
  );
}
