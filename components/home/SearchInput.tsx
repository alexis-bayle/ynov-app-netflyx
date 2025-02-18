import { makeStyles } from '~/theme';
import { Image, View, TextInput, ViewStyle, StyleProp } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const SearchInput = ({
  containerStyle,
}: Readonly<{ containerStyle?: StyleProp<ViewStyle> }>) => {
  const styles = useStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={require('assets/loop.png')} style={styles.searchIcon} />
      <TextInput placeholder="Search" placeholderTextColor="white" style={styles.input} />
      <View style={styles.microphoneIcon}>
        <Svg width={12} height={18} viewBox="0 0 12 18" fill="none">
          <Path
            d="M6.06494 11.7227C7.7168 11.7227 8.8291 10.4858 8.8291 8.71777V3.16455C8.8291 1.38818 7.7168 0.159668 6.06494 0.159668C4.40479 0.159668 3.29248 1.38818 3.29248 3.16455V8.71777C3.29248 10.4858 4.40479 11.7227 6.06494 11.7227ZM0.121582 8.85059C0.121582 12.1045 2.27148 14.3872 5.43408 14.6528V16.5869H2.35449C2.00586 16.5869 1.72363 16.8691 1.72363 17.2178C1.72363 17.5664 2.00586 17.8403 2.35449 17.8403H9.76709C10.1157 17.8403 10.3979 17.5664 10.3979 17.2178C10.3979 16.8691 10.1157 16.5869 9.76709 16.5869H6.6875V14.6528C9.8584 14.3872 12 12.1045 12 8.85059V7.16553C12 6.81689 11.7261 6.54297 11.3774 6.54297C11.0288 6.54297 10.7466 6.81689 10.7466 7.16553V8.80078C10.7466 11.6313 8.90381 13.5073 6.06494 13.5073C3.21777 13.5073 1.375 11.6313 1.375 8.80078V7.16553C1.375 6.81689 1.10107 6.54297 0.744141 6.54297C0.395508 6.54297 0.121582 6.81689 0.121582 7.16553V8.85059Z"
            fill="white"
            fillOpacity="0.6"
          />
        </Svg>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: '92%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: theme.colors.gray,
    borderRadius: theme.borderRadii.l_12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    fontSize: 12,
    height: 40,
    padding: 0,
    paddingLeft: 40,
    color: 'white',
  },
  searchIcon: {
    color: 'white',
    position: 'absolute',
    width: 20,
    height: 20,
    left: 10,
  },
  microphoneIcon: {
    color: 'white',
    position: 'absolute',
    right: 10,
  },
}));
