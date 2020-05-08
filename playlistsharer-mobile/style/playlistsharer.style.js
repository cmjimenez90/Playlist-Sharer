import {StyleSheet} from 'react-native'
export const color = {
    primary: '#D5CBFF',
    secondary: '#775498',
    accent: '#F1EFFB'
}

export const styles = StyleSheet.create({
    screen: {
        backgroundColor: color.primary,
        flex: 1
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    textContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
    },
    logoContainer: {
        flex: 1,
        justifyContent: "space-evenly"
    },
    logoImage: {
        alignSelf: "center"
    },
    caption: {
        fontSize: 22
    },
    buttonContainer: {
        alignItems: "center",
        width: "80%",
        flex: .5,
        justifyContent: "space-evenly"
    },
    buttonContainerHeader: {
        textAlign: "center",
        width: "100%",
        fontSize: 22,
        fontWeight: "600"
    }    
});

  