import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const ImageButton = ({source,onPress}) => {
    return (
       <TouchableOpacity onPress={onPress}>
           <Image  style={styles.img} source={source} />
       </TouchableOpacity>
    )
}

export default ImageButton

const styles = StyleSheet.create({
    img: {
        resizeMode: "contain"
    }
})