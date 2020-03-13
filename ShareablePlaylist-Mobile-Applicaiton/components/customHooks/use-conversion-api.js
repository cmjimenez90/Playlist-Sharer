import {useState,useEffect} from 'react'
import useValidateURL from './use-validate-url';
import APIClient from '../../services/api-client/shareableplaylistapi-client';
const useConversionAPI = (url) => {
    const apiClient = new APIClient();
    const urlType = useValidateURL(url);
    const [response, setResponse] = useState({});
    const [awaitingResponse, setAwatingResponse] = useState(true);
    const [hasError,setHasError] = useState(false);

    useEffect(() => {
        const convertToSpotify =  async () => {
            try{
                setAwatingResponse(true);
                const response = await apiClient.convertToSpotify('USER_TOKEN',url);
                setResponse(response);
            }
            catch (error){
                setHasError(true);
            }
            setAwatingResponse(false);

        };
        if(urlType === 'SPOTIFY'){
            setResponse({TYPE:"abc"});
        }
        if(urlType === 'APPLE'){
            convertToSpotify();
        }
    },[url]);
    
    return {response,awaitingResponse,hasError}
}

export default useConversionAPI
