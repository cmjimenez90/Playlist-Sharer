import React,  {useContext, useEffect} from 'react'
import {View, ActivityIndicator, NativeModules, Alert} from 'react-native'
import {AuthorizationContext} from '../../authorization/AuthorizationContext'
import AuthorizationStorage from '../../authorization/AuthorizationStorage'
import axios from 'axios'
import { styles, color } from '../../style/main.style'
  const AppleAuthScreen = ({navigation}) => {

    const [state,action] = useContext(AuthorizationContext);
    const authorizationStorage = new AuthorizationStorage();

    const appleDeveloperTokenURL = `http://10.0.0.45/authorize/apple`;
    const AppleMusicUserAuthorization = NativeModules.AppleMusicUserAuthorization;
    

    useEffect(() => {
        axios.get(appleDeveloperTokenURL)
        .then((response)=>{
            const data = response.data;
            if(data.hasError){
                console.log(data.errorMessage);
                return null;
            }
            else{
                const appleDevToken = data.authorizationToken;        
                    AppleMusicUserAuthorization.getUserToken(appleDevToken,(error, result) => {
                        if(error){
                            Alert.alert("Authorization Error", error);
                            navigation.navigate('SignInScreen');
                        } 
                        else{
                            action({type: 'AuthorizeApple', payload: {'apple_music_user_token': result}})
                            authorizationStorage.asyncSaveItemToStore(authorizationStorage.APPLE_MUSIC_USER_TOKEN,result.toString())
                            .then()
                            .catch((error)=>{
                                console.log(error);
                            })
                        }             
                    });
                }  
        })
        .catch((error)=>{
            console.log(error);
            return null;
        })   
    },[])
    

        

    return (
        <View style={[styles.container,styles.appleAuthScreen]}>
            <ActivityIndicator color={color.secondary} size="large"></ActivityIndicator>
        </View>
    )
}

export default AppleAuthScreen;
