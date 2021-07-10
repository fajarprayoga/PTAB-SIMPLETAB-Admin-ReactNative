import React from 'react'
import {Text,StyleSheet,View, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {Distance,colors} from '../../utils';

const Menu =(props)=>{
    return(
        <TouchableOpacity style={{width:'100%', alignItems:'center', paddingVertical:10}} onPress={props.onPress}>
            <LinearGradient colors={['#F0F9FD','#C6EBFF','#9EDEFD']} style={styles.boxStyle}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    {props.icon}
                    <Distance distanceH={10}/>
                    <Text style={styles.textStyle}>{props.title}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    boxStyle:{
        width:'90%', 
        height:80, 
        borderRadius:5, 
        justifyContent:'center',
        paddingHorizontal:5
    },
    textStyle:{
        fontSize:16,
        color:colors.text
    }
})
export default Menu