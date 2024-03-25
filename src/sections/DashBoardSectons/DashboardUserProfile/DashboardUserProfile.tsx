import {PlusIcon} from '@assets/svg/icons';
import {LinGrad} from '@components/FactoryComponents/FactoryComponents';
import useNavigate from '@hooks/useNavigate';
import {HStack, Image, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IHomeProfile} from './DashboardUserProfile.types';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectHasViewedTutorials,
  setHasViewedTutorials,
} from '@store/features/ui';

export default function DashboardUserProfile({
  name,
  balance,
  userAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
}: IHomeProfile) {
  const navigate = useNavigate();
  const insets = useSafeAreaInsets();
  const hasViewedTutorial = useSelector(selectHasViewedTutorials);
  const dispatch = useDispatch();

  return (
    <LinGrad
      colors={['#8F79F0', '#333CFF']}
      h={'200'}
      w="100%"
      pb="40px"
      pt={insets.top + 'px'}
      px={4}
      justifyContent="center">
      <HStack justifyContent="space-between" alignItems={'center'}>
        <HStack space={4} alignItems="center">
          <Pressable onPress={() => navigate('profileScreen')}>
            <Image
              source={{
                uri: userAvatar,
              }}
              alt="profile"
              h="50px"
              w="50px"
              borderRadius={'8px'}
              borderWidth="2px"
              borderColor="#ffffff"
              overflow="hidden"
            />
          </Pressable>
          <VStack>
            <Text color="#ffffff" fontSize={'sm'} fontWeight={400}>
              Welcome, {name}
            </Text>
            <Text
              color="#ffffff"
              fontSize={'md'}
              fontWeight={500}
              onPress={() => navigate('myWalletScreen')}>
              Balance : <Text fontWeight={700}>${balance}</Text>
            </Text>
          </VStack>
        </HStack>
        <Pressable
          onPress={() => {
            if (!hasViewedTutorial) {
              dispatch(setHasViewedTutorials(true));
              navigate('transferSourceScreen', {
                type: 'addFunds',
              });
            } else {
              navigate('detailsScreen', {
                type: 'addFunds',
              });
            }
          }}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          style={{
            gap: 8,
          }}>
          <PlusIcon
            style={{
              tintColor: '#ffffff',
              height: 24,
              width: 24,
            }}
          />
          <Text color="#ffffff" fontSize="sm" fontWeight={400}>
            Add Funds
          </Text>
        </Pressable>
      </HStack>
    </LinGrad>
  );
}
