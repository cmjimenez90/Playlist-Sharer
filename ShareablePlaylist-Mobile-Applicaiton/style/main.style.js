import {StyleSheet} from 'react-native'
export const color = {
    primary: '#c85cd6',
    secondary: '#9845a3',
    fontPrimary: '#e9daeb'
}

export const styles = StyleSheet.create({
    baseContainer: {
      flex: 1,
      backgroundColor: color.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    baseText: {
        color: color.fontPrimary,
    }
  });
  