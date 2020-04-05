import React, {useContext} from 'react'
import {View, Text, Alert} from 'react-native';

import {styles} from '../style/main.style';
import {AuthorizationContext} from '../authorization/AuthorizationContext';
import useAuthorization from '../authorization/useAuthorization';
import AccountStatus from './AccountStatus';

const  AccountManagement = () => {
    const {unauthorizeAppleMusic,unauthorizeSpotifyMusic} = useAuthorization();
    const [state, action] =  useContext(AuthorizationContext);

    const SignOutSpotify =  () => {
        unauthorizeSpotifyMusic(); 
    };
    const SignOutApple = () => {
        unauthorizeAppleMusic();
    };
    const SignInApple = () => {
        Alert.alert("Coming soon");
    };
    const SignInSpotify = () => {
        Alert.alert("Coming soon");
    };

    return (
        <View style={styles.accountManagement}>
            <View style={styles.accountManagementHeading}>
                <Text style={styles.accountManagementHeadingAccount}>Account</Text>
                <Text style={styles.accountManagementHeadingStatus}>Status</Text>
            </View>
            <AccountStatus accountName='Spotify' isSignedIn={state.isSpotifyAuthorized} onPress={state.isSpotifyAuthorized? SignOutSpotify : SignInSpotify}></AccountStatus>
            <AccountStatus accountName='Apple' isSignedIn={state.isAppleAuthorized}  onPress={state.isAppleAuthorized? SignOutApple : SignInApple} ></AccountStatus>
        </View>
    )
}

export default AccountManagement;
