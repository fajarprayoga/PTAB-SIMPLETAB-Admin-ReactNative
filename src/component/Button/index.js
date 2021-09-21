import React from 'react'
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native'
import {colors} from '../../utils'
const Button=(props)=>{
    return (
            <TouchableOpacity style={styles.btnStyle(props.width ? props.width:'80%', props.height, props.backgroundColor )} onPress={props.onPress}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', height:50}}>
                    {props.icon ? props.icon:null}
                    <Text style={styles.textStyle}>{props.title}</Text>
                </View>
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    textStyle:{
        color:'#FFFFFF', 
        paddingHorizontal:10,
        fontWeight:'bold',
        fontSize:15
    },
    btnStyle:(width, height,backgroundColor )=>({
        backgroundColor:backgroundColor ? backgroundColor:colors.button,
        height:height ? height : 50,
        width:width,
        borderRadius:10,
        PaddingVertical:10,
        justifyContent : 'center',
        alignItems:'center'
    }),
})
export default Button