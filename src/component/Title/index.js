import React from 'react'
import {Text,StyleSheet,View} from 'react-native'
import {colors} from '../../utils'

const Title=(props)=>{
    return(
        <View style={{paddingVertical:props.paddingVertical ? props.paddingVertical:20}}>
            <Text style={styles.textStyle}>{props.title}</Text>
        </View>
    )
}
const styles =StyleSheet.create({
    textStyle:{
        fontSize:25,
        color:colors.button,
        fontWeight:'bold'
    }
})
export default Title