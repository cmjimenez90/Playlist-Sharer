import React, {useState, useContext, useEffect} from 'react'
import {View, Text, ActivityIndicator, NativeModules} from 'react-native'
import {AuthenticationContext} from '../../authentication/AuthenticationContext'
import AuthenticationStorage from '../../authentication/AuthenticationStorage'
import axios from 'axios'
  const AppleAuthScreen = () => {

    const [state,action] = useContext(AuthenticationContext);
    const [isLoading,setLoading] = useState(true);
    const [authResult, setAuthResult] = useState('');
    const authenticationStorage = new AuthenticationStorage();

    const appleDeveloperTokenURL = `http://10.0.0.45/authorize/apple`;
    const AppleMusicUserAuthorization = NativeModules.AppleMusicUserAuthorization;
    

    useEffect(() => {
        setLoading(true);
        
        axios.get(appleDeveloperTokenURL)
        .then((response)=>{
            const data = response.data;
            if(data.hasError){
                console.log(data.errorMessage);
                return null;
            }
            else{
                const appleDevToken = data.authorizationToken;
                console.log(appleDevToken);

                console.log("good continue")
                
                    AppleMusicUserAuthorization.getUserToken(appleDevToken,(error, result) => {
                        if(error){
                            console.log("ERROR");
                        } 
                        else{
                            console.log("PASS");
                        }             
                    });
                }  
        })
        .catch((error)=>{
            console.log("REALLY BAD");
            return null;
        })
        
        
        setLoading(false);    
    },[])
    

        

    return (
        <View>
            {isLoading? (<ActivityIndicator></ActivityIndicator>
            ):(
                <Text>{authResult}</Text>
            )}
        </View>
    )
}

export default AppleAuthScreen;
