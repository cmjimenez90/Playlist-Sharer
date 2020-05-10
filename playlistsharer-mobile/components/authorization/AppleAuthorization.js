import React, { useEffect } from 'react';
import {View, ActivityIndicator, NativeModules, Alert} from 'react-native';
import {color} from '../../style/playlistsharer.style';
import axios from 'axios';
import {config} from '../../app-config';
import { useNavigation } from '@react-navigation/native';
import {useAuthorizationAction, actionType} from './AuthorizationContext';

const AppleAuthorization = () => {  
    const AppleMusicUserAuthorization = NativeModules.AppleMusicUserAuthorization;
    const navigation = useNavigation();
    const action = useAuthorizationAction();

    useEffect(() => {
        axios.get(new URL(config.APPLE_TOKEN_ENDPOINT,config.API_HOST).toString())
            .then((response)=>{
                const data = response.data;
                if(data.hasError){
                    console.log(data.errorMessage);
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
                console.log(error);
                return null;
            })   
    },[]);
    
    return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator color={color.secondary} size="large" />
            </View>       
    )
}

export default AppleAuthorization
