import * as React from 'react';
import { useState } from 'react';
import {TextInput,StyleSheet,View} from 'react-native';

const input =(props)=>{

    const [border, setBorder] = useState(true);

    const isFocus = () => setBorder(true);
    const isBlur = () => setBorder(false)
    return(
            <TextInput 
              onFocus={isFocus}
              onBlur={isBlur}
              style={[styles.input(border),{width:props.width ? props.width:'100%', borderWidth:props.borderWidth === 0 ? props.borderWidth:1,borderBottomWidth:1, height : props.height ? props.height : null, textAlignVertical: props.textAlignVertical ? props.textAlignVertical : null }]} placeholder={props.placeholder} placeholderTextColor='#c7c7c7' value={props.value} editable={props.editable} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText} keyboardType={props.keyboardType} 
            />
    )
}
const styles = StyleSheet.create({
    input : (border) => ({
      borderRadius:10,
      backgroundColor:'#ffffff',
      paddingHorizontal:20,
      borderColor:border ? '#087CDB' : 'grey',
      color:'#696969',
    }),
});
export default input;