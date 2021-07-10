import React from 'react';
import {Text,StyleSheet,TouchableOpacity,View} from 'react-native';
import IconIn from '../../assets/icon/iconIn.svg'

const In =(props) =>{
    return(
        <TouchableOpacity style={{paddingVertical:10}} onPress={props.onPress}>
            <View style={styles.section}>
                <Text style={styles.text}>{props.title}</Text>
                <IconIn/>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    section:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        height:35,
        },
     text:{
        paddingHorizontal:5,
        fontSize:15, 
        fontWeight:'bold'   
     }
  });
export default In