import colors from './colors';
import {fontSizes} from './typography';

const components = {
  Input: {
    baseStyle: {
      bg: '#fff',
      borderColor: colors.white,
      borderRadius: '8px',
      py: '13px',
      px: '20px',
      color: colors.gray[0],
      borderWidth: 0,
      _focus: {
        borderColor: colors.primary[100],
        backgroundColor: '#fff',
      },
      placeholderTextColor: colors.gray[0],
    },
    defaultProps: {
      fontSize: fontSizes.md,
    },
  },
  Text: {
    variants: {
      h1: {
        color: colors.black,
        fontSize: fontSizes['xl'],
        fontWeight: 600,
      },
      h2: {
        color: colors.black,
        fontSize: fontSizes.md,
        fontWeight: 700,
      },
      h3: {
        color: colors.black,
        fontSize: fontSizes.sm,
        fontWeight: 500,
      },
    },
  },
};

export default components;
