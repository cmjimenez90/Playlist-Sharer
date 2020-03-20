import {StyleSheet, Platform, StatusBar} from 'react-native'
export const color = {
    primary: '#D5CBFF',
    secondary: '#A49ACC',
    accent: '#F1EFFB'
}

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: color.primary,
    },
    signInScreen: {
        marginTop: 150
    },
    textContainer: {
        alignItems: "center",
        marginBottom: 100
    },
    textContainerHeader: {
        fontSize: 25,
        fontWeight: '400',
        marginBottom: 5
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    musicPlatformButton: {
        height: 55,
        width: 180
    },
    musicPlatformImage: {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        resizeMode: 'contain'
    }
  });
  