import {useState, useEffect} from 'react';

function useValidateUrl(url) {
    const [urlType,setUrlType] = useState(null);

    useEffect(() => {
        if(url.toString().includes('open.spotify.com')){
            setUrlType('SPOTIFY');
        }
        else if(url.toString().includes('music.apple.com')) {
            setUrlType('APPLE');
        } else {
            setUrlType(null);
        }    
    },[]);

    return urlType
}

export default useValidateUrl;