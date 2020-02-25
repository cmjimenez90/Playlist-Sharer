import {StyleSheet} from 'react-native'
export const color = {
    primary: '#c85cd6',
    secondary: '#9845a3',
    fontPrimary: '#e9daeb'
}

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: color.primary
    },
    header: {
        paddingTop: 45,
        paddingBottom: 15,
        backgroundColor: color.secondary,
    },
    headerText: {
        color: color.fontPrimary,
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
    }
  });
  