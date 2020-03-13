import {styles} from '../style/main.style'
import React from 'react';
import {View, Image,Text} from 'react-native';
import UseURLDisplayDetails from './customHooks/use-url-display-details';

function URLDisplay({url}){
    const {urlDisplayDetails,isLoading,hasError} = UseURLDisplayDetails(url);

    return (
        <View style={styles.urlDisplayContainer}>     
            {
                isLoading ? 
                    (
                        <Text style={{fontSize:25}}>Loading ...</Text>
                        ) : (
                        <View>
                            <View style={styles.urlDisplayTextContainer}>
                                <Text style={styles.urlDisplayName}>{urlDisplayDetails.name}</Text>
                                <Text style={styles.urlDisplayType}>{urlDisplayDetails.type}</Text>
                            </View>
                            <Image source={{uri: urlDisplayDetails.url}} style={styles.urlDisplay}/>
                        </View>
                    )
            }
            {hasError && <Text>Trouble fetching data..</Text>}
        </View>
    )    
}

export default URLDisplay;

