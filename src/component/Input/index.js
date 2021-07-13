import * as React from 'react';
import {TextInput,StyleSheet,View} from 'react-native';
const input =(props)=>{
    return(
            <TextInput style={[styles.input,{width:props.width ? props.width:'100%', borderWidth:props.borderWidth === 0 ? props.borderWidth:1,borderBottomWidth:1, }]} placeholder={props.placeholder} placeholderTextColor='#c7c7c7' value={props.value} editable={props.editable} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText} keyboardType={props.keyboardType} />
    )
}
const styles = StyleSheet.create({
    input:{
      borderRadius:10,
      backgroundColor:'#ffffff',
      paddingHorizontal:20,
      borderColor:'#087CDB',
    },
});
export default input;