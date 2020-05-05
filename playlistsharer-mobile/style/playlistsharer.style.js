import {StyleSheet} from 'react-native'
export const color = {
    primary: '#D5CBFF',
    secondary: '#A49ACC',
    accent: '#F1EFFB'
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: "center"
    },
    textContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
    },
    logoImage: {
        marginTop: 25
    },
    buttonContainer: {
        alignItems: "center",
        width: "80%",
        flex: .5,
        justifyContent: "space-evenly"
    },
    buttonContainerHeader: {
        marginTop: 25,
        textAlign: "center",
        width: "100%",
        fontSize: 22,
        fontWeight: "600"
    }    
});

  