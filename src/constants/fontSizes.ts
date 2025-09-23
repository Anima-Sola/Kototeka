import {PixelRatio} from 'react-native';

const fontScale = PixelRatio.getFontScale();

const fontSizes = {
  FONT10: 10 / fontScale,
  FONT12: 12 / fontScale,
  FONT13: 13 / fontScale,
  FONT14: 14 / fontScale,
  FONT15: 15 / fontScale,
  FONT16: 16 / fontScale,
  FONT18: 18 / fontScale,
  FONT20: 20 / fontScale,
  FONT30: 30 / fontScale,
  FONT32: 32 / fontScale,
  FONT50: 50 / fontScale,
};

export default fontSizes;
