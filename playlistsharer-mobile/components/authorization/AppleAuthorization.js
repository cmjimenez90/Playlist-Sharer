import React, { useEffect } from 'react';
import {View, ActivityIndicator, NativeModules, Alert} from 'react-native';
import {color, styles} from '../../style/playlistsharer.style';
import axios from 'axios';
import {config, constants} from '../../app-config';
import { useNavigation } from '@react-navigation/native';
import {useAuthorizationState,useAuthorizationAction, actionType} from './AuthorizationContext';
 
const AppleAuthorization = () => {  
    const AppleMusicUserAuthorization = NativeModules.AppleMusicUserAuthorization;
    const navigation = useNavigation();
    const action = useAuthorizationAction();
    const {AppleAuth} = useAuthorizationState();

    useEffect(() => {
        if(AppleAuth){
            navigation.navigate("Converter", {platform: constants.PLATFORM.APPLE});
        }
        else{
            axios.get(new URL(config.APPLE_TOKEN_ENDPOINT,config.API_HOST).toString())
            .then((response)=>{
                const data = response.data;
                if(data.hasError){
                     Alert.alert("Authorization Error", data.errorMessage);
                     navigation.popToTop();
                }
                else{
                    const appleDevToken = data.authorizationToken;        
                        AppleMusicUserAuthorization.getUserToken(appleDevToken,(error, result) => {
                            if(error){
                                Alert.alert("Authorization Error", error);
                                navigation.popToTop();
                            } 
                            else{
                                action({type: actionType.authorizeApple, payload: {'AppleAuth': {
                                    'access_token': result.toString()
                                }}});
                                navigation.navigate("Converter");
                            }             
                        });
                    }  
            })
            .catch((error)=>{
                return error;
            })   
        }    
    },[AppleAuth, AppleMusicUserAuthorization, action, navigation]);
    
    return (
            <View style={[{flex: 1, justifyContent: "center"},styles.screen]}>
                <ActivityIndicator color={color.secondary} size="large" />
            </View>       
    )
}

export default AppleAuthorization
