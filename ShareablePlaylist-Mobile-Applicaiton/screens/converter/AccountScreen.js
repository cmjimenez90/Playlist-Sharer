import React from 'react';
import {View} from 'react-native';
import {styles} from '../../style/main.style';

import AccountManagement from '../../components/AccountManagement';

const AccountScreen = () => {
    return (
        <View style={styles.container}>
          <View style={{justifyContent: "center", alignItems: "center", paddingTop: 25}}>
            <AccountManagement/>
          </View>
        </View>
    )
}

export default AccountScreen;
