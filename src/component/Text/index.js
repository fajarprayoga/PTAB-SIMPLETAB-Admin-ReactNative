import * as React from 'react';
import {Text,StyleSheet,View} from 'react-native';
import { colors } from '../../utils';

const TextInput=(props)=>{
    return(
        <View style={{paddingVertical:props.paddingVertical ? props.paddingVertical:10}}>
            <Text style={styles.textStyle}>{props.title}</Text>
        </View>
    )
    
} 
const styles = StyleSheet.create({
    textStyle:{
        color:colors.text,
        fontSize:16,
    }
})

export default TextInput