import React, {useContext} from 'react'
import {View, Text, Alert} from 'react-native';

import {styles} from '../style/main.style';
import {AuthorizationContext} from '../authorization/AuthorizationContext';
import AuthorizationStorage from '../authorization/AuthorizationStorage';

import AccountStatus from './AccountStatus';

const  AccountManagement = () => {  
    const authorizationStorage = new AuthorizationStorage();
    const [state, action] =  useContext(AuthorizationContext);

    const SignOutSpotify =  () => {
        authorizationStorage.asyncClearSpotifyFromStore().then(
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
        authorizationStorage.asyncClearAppleFromStore().then(
            (data) => {
                if(data){
                    action({type: 'SignOutApple'})
                }
            }
        ).catch((error) => {
            console.log(error);
        });  
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
