import {StyleSheet, Platform, StatusBar} from 'react-native'
export const color = {
    primary: '#D5CBFF',
    secondary: '#A49ACC',
    accent: '#F1EFFB'
}

export const styles = StyleSheet.create({
    statusBar: {
        height: (Platform.OS === 'ios') ? 40 : StatusBar.currentHeight
    },
    container: {
        height: "100%",
        backgroundColor: color.primary
    },
    header: {
        backgroundColor: color.secondary,
        height: 60,
        justifyContent: "center"
    },
    headerText: {
        paddingLeft: 20,
        color: color.accent,
        fontWeight: "bold",
        fontSize: 30,
    },
    urlDisplay: {}
  });
  