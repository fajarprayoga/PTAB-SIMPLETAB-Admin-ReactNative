import React from 'react';
import { Image,View,Text,StyleSheet} from 'react-native';

const Header =()=>{
    return(
        <View style={styles.Container}>
            <Image source={require('../../assets/img/HeaderView.png')} style={styles.imageStyle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    imageStyle:{
        width:210, 
        height:127,
        top:0,
        right:0
    },
});
export default Header