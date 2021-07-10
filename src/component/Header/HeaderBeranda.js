import React from 'react';
import { Image,View,StyleSheet} from 'react-native';

const HeaderBeranda =(props)=>{
    return(
        <View style={styles.Container}>
            <Image source={require('../../assets/img/HeaderBeranda.png')} style={styles.imageStyle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        alignItems:'center'
    },
    imageStyle:{
        width:'100%', 
        height:280,
        top:0
    },
});
export default HeaderBeranda