import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 390;

const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const responsiveFontSize = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(scale(size)));

const verticalScale = (size: number) => (height / 844) * size;

export const responsive = {
  fontSize: {
    xs: responsiveFontSize(12),
    sm: responsiveFontSize(14),
    base: responsiveFontSize(16),
    lg: responsiveFontSize(18),
    xl: responsiveFontSize(20),
    "2xl": responsiveFontSize(24),
    "3xl": responsiveFontSize(30),
    "4xl": responsiveFontSize(34),
    "5xl": responsiveFontSize(56),
  },
  spacing: {
    xs: Math.round(scale(4)),
    sm: Math.round(scale(8)),
    md: Math.round(scale(16)),
    lg: Math.round(scale(20)),
    xl: Math.round(scale(24)),
    "2xl": Math.round(scale(28)),
    "3xl": Math.round(scale(32)),
  },
  borderRadius: {
    sm: Math.round(scale(8)),
    md: Math.round(scale(12)),
    lg: Math.round(scale(18)),
    xl: Math.round(scale(24)),
    full: 999,
  },
  imageHeight: {
    sm: Math.round(verticalScale(140)),
    md: Math.round(verticalScale(180)),
    lg: Math.round(verticalScale(240)),
  },
};
