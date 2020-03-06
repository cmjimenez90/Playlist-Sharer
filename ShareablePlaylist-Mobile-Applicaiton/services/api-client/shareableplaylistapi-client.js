import axios from 'axios'
import config from 'react-native-dotenv'

export default class ShareablePlaylistClient {
    constructor(){
        this.apiRoot = config.ShareablePlaylistURL;
    };

    
}
