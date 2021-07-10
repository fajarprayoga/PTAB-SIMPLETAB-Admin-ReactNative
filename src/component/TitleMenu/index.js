import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {colors} from '../../utils'

const TitleMenu=(props)=>{
    return(
        <View style={{alignItems:'center',paddingVertical:20}}>
            <View style={styles.boxStyle}>
                <Text style={styles.textStyle}>{props.title}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    boxStyle:{
        backgroundColor:colors.button, 
        width:'90%', 
        height:50, 
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20
    },
    textStyle:{
        color:'#FFFFFF',
        fontSize:17, 
        fontWeight:'bold', 
    }
});
export default TitleMenu