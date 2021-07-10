import React from 'react'
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native'
import {colors} from '../../utils'
const Button=(props)=>{
    return (
            <TouchableOpacity style={styles.btnStyle(props.width ? props.width:'80%')} onPress={props.onPress}>
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
    btnStyle:(width)=>({
        backgroundColor:colors.button, 
        height:50,
        width:width,
        borderRadius:10,
        PaddingVertical:10
    }),
})
export default Button