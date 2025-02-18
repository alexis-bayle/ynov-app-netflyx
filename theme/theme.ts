import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const palette = {
  lightGray: "rgba(255, 255, 255, 0.75)",
  gray: '#808080',
  darkGray: '#38434D',
  
  white: '#FFFFFF',
  black: '#000000',
  primaryBg: '#171719',

  orange: '#F2A33A',
  lightBlue: '#00FAFE',
  lightGreen: '09FACA',
  purple: '#FF35B8',
};

const theme = createTheme({
  colors: {
    ...palette,
  },
  spacing: {
    xs_4: 4,
    s_8: 8,
    sm_12: 12,
    m_16: 16,
    ml_24: 24,
    l_32: 32,
    xl_64: 64,
  },
  borderRadii: {
    s_3: 3,
    m_6: 6,
    l_12: 12,
    xl_24: 24,
  },
  textVariants: {
    title: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Open-Sans' },

    body: {
      fontSize: 16,
      fontFamily: 'Open-Sans',
    },
    subInfo: {
      fontSize: 13,
      fontWeight: 'thin',
      fontFamily: 'Open-Sans',
    },
    large: {
      fontSize: 36,
      fontFamily: 'Open-Sans',
    },
    extra_large: {
      fontSize: 64,
      fontWeight: 'bold',
      fontFamily: 'Open-Sans',
    },
    defaults: {
      fontFamily: 'Open-Sans',
      // We can define a default text variant here.
    },
  },
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export default theme;
