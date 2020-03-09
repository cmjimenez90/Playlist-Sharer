import {useState, useEffect} from 'react';
import APIClient from '../../services/api-client/shareableplaylistapi-client';

function useURLDisplayDetails(url) {
    const apiClient = new APIClient();
    const [urlDisplayDetails, setUrlDisplayDetails] = useState(null);
    const [isLoading,setLoading] = useState(false);

    async function getAppleURLDisplayDetails(url){
        try{
            setLoading(true);
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
            setLoading(null);
        }
        finally{
            setLoading(false);
        }
    }
    

    async function getSpotifyURLDisplayDetails(url){
        try{
            setLoading(true);
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
            setLoading(null);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(url.includes('open.spotify.com')){
            getSpotifyURLDisplayDetails(url);
        }
        else if(url.includes('music.apple.com')) {
            getAppleURLDisplayDetails(url);
        } else {
            setUrlDisplayDetails(null);
        }    
    },[url]);

    return [urlDisplayDetails,isLoading];
}

export default useURLDisplayDetails;