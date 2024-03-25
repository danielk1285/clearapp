import {IOnBoardingScreen} from '@screens/AuthScreens/OnBoardingScreen/OnBoardingScreen.types';

export interface IOnBoardingFooter {
  item: IOnBoardingScreen[];
  currentSlideIndex: number;
  goToNextSlide: () => void;
}
