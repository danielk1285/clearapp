// ActivityDetailModal.js
import React from 'react';
import {Animated, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {DateTime} from 'luxon';

const ActivityDetailModal = ({
  modalVisible,
  hideModal,
  modalY,
  type,
  status,
  statusStyle,
  icon,
  sentAmount,
  exchangeAmount,
  dateTime,
  conversionRate,
  currencySymbols,
  currencySymbol,
}) => {
  console.log('currencySymbols', currencySymbols);
  return (
    <Modal
      animationType="none"
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
              {icon}
              <View>
                <Text style={styles.modalTitle}>{type}</Text>
                <Text style={[styles.modalStatus, statusStyle]}>{status}</Text>
              </View>
            </View>
            <View style={styles.dottedLine} />
            <View>
              {sentAmount && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Sent Amount:</Text>
                  <Text style={[styles.detailValue, styles.fontBold]}>
                    {currencySymbols?.[0] || currencySymbol}
                    {Number(sentAmount).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              )}
              {exchangeAmount && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>
                    {status === 'Complete' ? 'Exchanged' : 'Expected'} Amount:
                  </Text>
                  <Text style={[styles.detailValue, styles.fontBold]}>
                    {currencySymbols?.[1]}
                    {Number(exchangeAmount).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              )}
              {conversionRate && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Conversion Rate:</Text>
                  <Text style={styles.detailValue}>
                    {conversionRate.replace(/^\s+/, '')}
                  </Text>
                </View>
              )}
              {dateTime && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Date & Time:</Text>
                  <Text style={[styles.detailValue, styles.dateTimeValue]}>
                    {DateTime.fromISO(dateTime).toFormat(
                      'LLL dd, yyyy | hh:mm a',
                    )}
                  </Text>
                </View>
              )}
              <Text style={styles.customerSupport}>
                Need Help?{' '}
                <Text style={styles.contactSupport}>Contact Support</Text>
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingTop: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    textAlign: 'center',
  },
  headerLink: {
    color: 'blue',
  },
  myActivityText: {
    padding: 15,
    fontSize: 16,
    fontWeight: '700',
  },
  activityList: {
    // add your styles here
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  activityItemRight: {
    alignItems: 'flex-end',
  },
  activityContent: {
    marginLeft: 10,
    flex: 1,
  },
  activityStatus: {
    fontWeight: 'bold',
  },
  activityTime: {
    color: 'grey',
    flex: 2,
  },
  dottedLine: {
    width: '100%',
    height: 1,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderStyle: 'dotted',
    borderRadius: 1,
    marginBottom: 20,
  },
  sentAmount: {
    fontWeight: 'bold',
  },
  detailsButton: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalContent: {
    width: '100%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  modalStatus: {
    marginLeft: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#616164',
    flex: 1,
  },
  customerSupport: {
    marginTop: 20,
    color: '#616164',
  },
  contactSupport: {
    textDecorationLine: 'underline',
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
  },
  dateTimeValue: {
    flex: 2,
  },
  fontBold: {
    fontWeight: 'bold',
  },
});
export default ActivityDetailModal;
