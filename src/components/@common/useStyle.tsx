import {StyleProp, useColorScheme} from 'react-native';

type CommonStyle = {
  backgroundColor: string;
  unSelectedColor: string;
  selectedColor: string;
  containerStyle: StyleProp<any>;
};

function useStyle(): CommonStyle {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? '' : '#F2F2F2';

  return {
    backgroundColor,
    unSelectedColor: '#A4A4A4',
    selectedColor: '#151515',
    containerStyle: {
      backgroundColor,
      height: '100%',
      paddingHorizontal: 20,
    },
  };
}

export default useStyle;
