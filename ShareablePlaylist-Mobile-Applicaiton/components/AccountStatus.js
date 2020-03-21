import React from 'react'
import {View,Text, TouchableOpacity} from 'react-native';
import {styles} from '../style/main.style';
import { Ionicons } from  '@expo/vector-icons';

const  AccountStatus = ({accountName,isSignedIn, signOut}) => {    
    return (
        <View style={styles.accountStatus}>
            <Text style={styles.accountStatusName}>{accountName}</Text>
            <TouchableOpacity style={styles.accountStatusIcon}>
                <Ionicons name={isSignedIn? 'md-checkmark-circle-outline':'md-close-circle-outline'} color={isSignedIn? 'green' : 'red'} size={30} />
            </TouchableOpacity>
        </View>
    )
}
export default AccountStatus;
