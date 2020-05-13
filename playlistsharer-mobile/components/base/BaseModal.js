import React from 'react'
import { StyleSheet, View , useWindowDimensions} from 'react-native'
import { styles, color } from '../../style/playlistsharer.style'
const BaseModal = ({children, isVisible}) => {
    const modalHeight = useWindowDimensions().height / 2;

    return (
        isVisible ?
            <View style={{...component.modal,height: modalHeight}}>
                {children}
            </View>
        :
            <>
            </>   
    )
}

export default BaseModal

const component = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        transform: [{translateY: 100}],
        width: "90%",
        position: "absolute",
        backgroundColor: color.accent,
        elevation: 10,
        shadowRadius: 12,
        shadowOpacity: .65
          
    }
})
