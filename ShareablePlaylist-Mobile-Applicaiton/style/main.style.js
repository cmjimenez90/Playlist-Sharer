import {StyleSheet, Platform, StatusBar} from 'react-native'
export const color = {
    primary: '#D5CBFF',
    secondary: '#A49ACC',
    accent: '#F1EFFB'
}

export const styles = StyleSheet.create({
    statusBar: {
        height: (Platform.OS === 'ios') ? 40 : StatusBar.currentHeight,
        backgroundColor: color.secondary

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
    body: {
        height: "60%",
        justifyContent: "center",
    },
    urlDisplayContainer: {
        alignItems: "center",
        marginBottom: 100
    },
    urlDisplayTextContainer: {
        marginBottom: 10
    },
    urlDisplay: {
        width: 200,
        height: 200,
    },
    urlDisplayName: {
        color: color.accent,
        fontSize: 30
    },
    urlDisplayType:{
        color: color.accent,
        textAlign: "right",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    logoButtonContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    logoButton: {
       width: 200,
       height: 50,
       resizeMode: "contain"
    }
  });
  