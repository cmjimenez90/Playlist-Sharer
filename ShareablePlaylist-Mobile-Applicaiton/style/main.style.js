import {StyleSheet} from 'react-native'
export const color = {
    primary: '#D5CBFF',
    secondary: '#A49ACC',
    accent: '#F1EFFB'
}

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: color.primary
    },
    header: {
        backgroundColor: color.secondary,
    },
    headerText: {
        paddingLeft: 20,
        color: color.accent,
        fontWeight: "bold",
        fontSize: 30,
    }
  });
  