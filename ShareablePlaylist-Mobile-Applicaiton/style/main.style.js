import {StyleSheet, Platform} from 'react-native'
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
    appleAuthScreen: {
        justifyContent: 'center',
        flex: 1,
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
    },
    urlEntryFrom: {
        alignItems: "center",
        marginBottom: 20
    },
    urlTextHeader: {
        fontSize: 27,
        color: color.secondary
    },
    urlTextEntry: {
        height: 50,
        width: '75%',
        borderWidth: 1,
        backgroundColor: color.accent,
        color: color.secondary
    },
    URLModalContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    URLModalText: {
        color: color.secondary,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20
    },
    accountManagement: {
        width: '75%'
    },
    accountManagementHeading: {
        flexDirection: 'row',
        backgroundColor: color.secondary,
        height: 40,
    },
    accountManagementHeadingAccount: {
        color: color.accent,
        textAlign: "center",
        alignSelf: 'center',
        fontWeight: 'bold',
        flex: 2,
    },
    accountManagementHeadingStatus: {
        color: color.accent,
        textAlign: "center",
        alignSelf: 'center',
        fontWeight: 'bold',
        flex: 1,
    },
    accountStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    accountStatusName: {
        flex: 2,
        textAlign: 'center',
        fontSize: 25,
        color: color.secondary
    },
    accountStatusIcon: {
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: color.secondary
    }
  });

  