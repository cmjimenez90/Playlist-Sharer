import {useState, useEffect} from 'react';
import useValidateURL from './use-validate-url';
import APIClient from '../../services/api-client/shareableplaylistapi-client';

const useURLDisplayDetails = (url) => {
    const apiClient = new APIClient();
    const urlType = useValidateURL(url);
    const [urlDisplayDetails, setUrlDisplayDetails] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {

         const getAppleURLDisplayDetails = async () => {
            try{
                setIsLoading(true);
                const response = await apiClient.getAppleMusicURLDetails(url);
                const details = {
                    name: response.attributes.name,
                    type: response.type,
                    url: (response.attributes.artwork.url).replace('{w}',640).replace('{h}',640),
                    width: response.attributes.artwork.width,
                    height: response.attributes.artwork.height
                }
                setUrlDisplayDetails(details);
            } catch(error){
                setHasError(true);
            }
            setIsLoading(false);
        }

        const getSpotifyURLDisplayDetails = async () => {
            try{
                setHasError(false);
                setIsLoading(true);
                const response = await apiClient.getSpotifyMusicURLDetails(url);
                const images = response.images;
                const details = {
                    name: response.name,
                    type: response.type,
                    url: images[0].url,
                    width: images[0].width,
                    height: images[0].height
                }
                setUrlDisplayDetails(details);
            }catch(error){
                setHasError(true);
            }

            setIsLoading(false);
        }

        if(urlType == 'SPOTIFY'){
            console.log('fetching details - spotify');
            getSpotifyURLDisplayDetails();
            console.log('calledDisplayUpdate');
        }
        if(urlType == 'APPLE') {
            console.log('fetching details - apple');
            getAppleURLDisplayDetails();
            console.log('calledDisplayUpdate');
        }   
    },[url]);

    return {urlDisplayDetails,isLoading,hasError};
}

export default useURLDisplayDetails;