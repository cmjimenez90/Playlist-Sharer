import {styles} from '../style/main.style'
import React from 'react';
import {View, Image,Text} from 'react-native';
import UseURLDisplayDetails from './customHooks/use-url-display-details';

export default function URLDisplay({url}){
    const [urlDetails,isLoading] = UseURLDisplayDetails(url);

    if(isLoading === null){
        return(
            <View styles={styles.urlDisplayContainer}>
                <Text>Something went wrong</Text>
            </View>
        )
    }

    if(isLoading || urlDetails === null){
       return (
        <View styles={styles.urlDisplayContainer}>
          <Text>Loading ....</Text>
        </View>
       )
    }

    return (
        <View style={styles.urlDisplayContainer}>
            <View style={styles.urlDisplayTextContainer}>
                <Text style={styles.urlDisplayName}>{urlDetails.name}</Text>
                <Text style={styles.urlDisplayType}>{urlDetails.type}</Text>
            </View>
            <Image source={{uri: urlDetails.url}} style={styles.urlDisplay}/>
        </View>
    )
}

