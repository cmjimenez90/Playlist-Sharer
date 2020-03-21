import React, {useContext} from 'react'
import {View, Text, Alert} from 'react-native';

import {styles} from '../style/main.style';
import {AuthenticationContext} from '../authentication/AuthenticationContext';
import AuthenticationStorage from '../authentication/AuthenticationStorage';

import AccountStatus from './AccountStatus';

const  AccountManagement = () => {  
    const authenticationStorage = new AuthenticationStorage();
    const [state, action] =  useContext(AuthenticationContext);

    const SignOutSpotify =  () => {
        const signedOut = authenticationStorage.asyncClearSpotifyFromStore().then(
            (data) => {
                if(data){
                    action({type: 'SignOutSpotify'})
                }
            }
        ).catch((error) => {
            console.log(error);
        });  
    };
    const SignOutApple = () => {
        Alert.alert('Sign out from Apple Coming Soon')
    };
    const SignInApple = () => {
        Alert.alert('Sign in to Apple Coming Soon')
    };
    const SignInSpotify = () => {
        Alert.alert('Sign in to Spotify Coming Soon')
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
