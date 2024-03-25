import slides from '@appData/oboardingData';
import OnBoardingFooter from '@sections/OnBoardingSections/OnBoardingFooter/OnBoardingFooter';
import OnBoardingSlide from '@sections/OnBoardingSections/OnBoardingSlide/OnBoardingSlide';
import asRoute from 'hoc/asRoute';
import {ScrollView} from 'native-base';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export interface IOnBoardingScreen {
  id: string;
  image: any;
  title: string;
  subtitle: string;
}

export interface IOnBoardingItem {
  item: IOnBoardingScreen;
}

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const ref = React.useRef<FlatList>(null);


  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      if (ref?.current) {
        ref.current.scrollToOffset({offset});
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    }
  };

  return (
    <ScrollView flex={1} bg={'#F7F7F7'}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={[styles.container]}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}: IOnBoardingItem) => (
          <OnBoardingSlide item={item} />
        )}
      />
      <OnBoardingFooter
        item={slides}
        goToNextSlide={goToNextSlide}
        currentSlideIndex={currentSlideIndex}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.6,
    marginVertical: 20,
  },
});

const onBoardingScreen = asRoute(OnboardingScreen, 'onBoardingScreen', {
  headerShown: false,
});

export default onBoardingScreen;
