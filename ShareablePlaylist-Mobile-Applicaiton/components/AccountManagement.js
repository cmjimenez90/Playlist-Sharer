import React, {useContext} from 'react'
import {View, Text} from 'react-native';

import {styles} from '../style/main.style';
import {AuthenticationContext} from '../authentication/AuthenticationContext';
import AccountStatus from './AccountStatus';

const  AccountManagement = () => {  
    const [state, action] =  useContext(AuthenticationContext);

    return (
        <View style={styles.accountManagement}>
            <View style={styles.accountManagementHeading}>
                <Text style={styles.accountManagementHeadingAccount}>Account</Text>
                <Text style={styles.accountManagementHeadingStatus}>Status</Text>
            </View>
            <AccountStatus accountName='Spotify' isSignedIn={state.isSpotifyAuthorized}></AccountStatus>
            <AccountStatus accountName='Apple' isSignedIn={state.isAppleAuthorized}></AccountStatus>
        </View>
    )
}

export default AccountManagement;
