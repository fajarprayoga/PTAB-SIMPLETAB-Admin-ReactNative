import React from 'react';
import {Text,StyleSheet,View,TouchableOpacity,} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {colors} from '../../utils/colors/index'

  const ButtonAdd =(props)=>{
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={{flexDirection:'row', paddingVertical:10}}>    
                <View style={{paddingRight:5}}>
                    <FontAwesomeIcon icon={props.icon} style={{color:colors.success}} size={ 35 } />
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.text}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }
  const styles = StyleSheet.create({
    text:{
        color:'#5AC345', 
        textDecorationLine: 'underline',
        fontWeight:'bold',
        fontSize:22
    }
 });
  export default ButtonAdd