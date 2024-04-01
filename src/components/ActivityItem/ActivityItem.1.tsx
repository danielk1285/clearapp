import React, {useState} from 'react';
import {Animated, Modal, Pressable, Text, View} from 'react-native';
import {DateTime} from 'luxon';
import TransferIcon from '@assets/svg/Transfer';
import YouExchangedIcon from '@assets/svg/YouExchanged';
import WithdrawIcon from '@assets/svg/Withdraw';
import {ActivityItemProps} from './ActivityItemProps';
import {styles} from './ActivityItem';

export const ActivityItem: React.FC<ActivityItemProps> = ({
  status,
  'sent amount': sentAmount = '',
  'date and time': dateTime = '',
  'status color': statusColor = '',
  type,
  currency,
  'conversion rate': conversionRate = '',
  toggleBottomTab = () => {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalY] = useState(new Animated.Value(300));

  const activityStatusColor = (() => {
    switch (statusColor) {
      case 'Orange':
        return '#FB8500';
      case 'Green':
        return '#02B134';
      default:
        return 'black';
    }
  })();

  const statusStyle = {
    ...styles.activityStatus,
    color: activityStatusColor,
  };

  const icon = (() => {
    switch (type) {
      case 'Transfer':
        return <TransferIcon />;
      case 'Exchange':
        return <YouExchangedIcon />;
      case 'Withdrawal':
        return <WithdrawIcon />;
      default:
        return <TransferIcon />;
    }
  })();

  const displayTime = DateTime.fromISO(dateTime).toRelative();
  const currencySymbol = (() => {
    const currencyOrConversion = currency || conversionRate;
    switch (currencyOrConversion) {
      case 'USD':
        return '$';
      case 'ILS':
        return '₪';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      default:
        return currencyOrConversion.replace(/\s/g, '')[0];
    }
  })();

  const showModal = () => {
    setModalVisible(true);
    Animated.timing(modalY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    toggleBottomTab();
  };

  const hideModal = () => {
    Animated.timing(modalY, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
    toggleBottomTab();
  };

  return (
    <View style={styles.activityItem}>
      {icon}
      <View style={styles.activityContent}>
        <Text style={styles.sentAmount}>
          {currencySymbol}
          {Number(sentAmount).toFixed(2)}
        </Text>
        <Text style={styles.activityTime}>
          {type} | {displayTime}
        </Text>
      </View>
      <View style={styles.activityItemRight}>
        <Text style={[statusStyle]}>{status}</Text>
        <Pressable style={styles.detailsButton} onPress={() => showModal()}>
          <Text>View Details</Text>
        </Pressable>
      </View>

      <Modal
        animationType="none" // Turn off default modal animation
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <Pressable style={styles.modalOverlay} onPress={hideModal}>
          <Animated.View
            style={[styles.modalView, {transform: [{translateY: modalY}]}]}>
            <Pressable
              style={styles.modalContent}
              onPress={e => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <>{icon}</>
                <View>
                  <Text style={styles.modalTitle}>{type}</Text>
                  <Text style={[styles.modalStatus, statusStyle]}>
                    {status}
                  </Text>
                </View>
              </View>
              <View style={styles.dottedLine} />

              <Text>
                {DateTime.fromISO(dateTime).toFormat('LLL dd, yyyy | hh:mm a')}
              </Text>
              <Text>Amount: {sentAmount}</Text>
              {conversionRate && (
                <Text>
                  Conversion Rate: {conversionRate.replace(/^\s+/, '')}
                </Text>
              )}
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};
