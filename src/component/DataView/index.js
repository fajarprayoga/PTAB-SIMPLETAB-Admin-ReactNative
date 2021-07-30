import React from 'react'
import {View,Text,StyleSheet} from 'react-native';

const DataView =(props)=>{
    return(
        <View style={{paddingVertical:10}}>
            <View style={{flexDirection:'row',height:props.heigt ? props.height:'auto'}}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>{props.title}</Text>
                </View>
                <View style={{flex:1.2,flexDirection:'row'}}>
                    <Text style={styles.textStyle}>: </Text>
                    <Text onPress={props.onPress} style={[styles.textStyle, {color : props.color ? props.color : 'black'}]}>{props.txt}</Text>
                    <View>{props.image}</View>
                    <View>{props.video}</View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    textStyle:{
        fontSize:16,
        color:'#696969'
    }
})
export default DataView