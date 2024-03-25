import React, {useRef, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';

import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';


import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const FullScreenActionSheet = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}) => {
  const sheetHeight = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      sheetHeight.value = withSpring('auto');
    } else {
      sheetHeight.value = withSpring(0);
    }
  }, [isOpen]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      // Do something when the gesture starts
    },
    onActive: event => {
      sheetHeight.value = event.translationY;
    },
    onEnd: event => {
      if (event.translationY > 50) {
        onClose?.();
      } else {
        sheetHeight.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: sheetHeight.value}],
    };
  });

  return (
    <GestureHandlerRootView>
      {isOpen && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.sheetContainer, animatedStyle]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              {/* Your close button component */}
            </TouchableOpacity>
            {children}
          </Animated.View>
        </PanGestureHandler>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'gray',
  },
});

export default FullScreenActionSheet;
