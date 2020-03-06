import {useState, useEffect} from 'react';
import APIClient from '../services/api-client/shareableplaylistapi-client';

export default function useURLDisplay({url}) {
    const apiClient = new APIClient();
    const [urlDisplayDetails, setUrlDisplayDetails] = useState(null);

    useEffect(()=> {
        async function getURLDetails(url){
            try{
                const response = await apiClient.getAppleMusicURLDetails(url);
                setUrlDisplayDetails(response.attributes.artwork);
            }
            catch(error){               
            }
        }
    });

    return urlDisplayDetails;
}