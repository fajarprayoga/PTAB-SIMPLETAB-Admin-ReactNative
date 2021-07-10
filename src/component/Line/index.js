import React from 'react' ;
import{View,StyleSheet,}from 'react-native';

const Line = ()=>{
    return(
        <View style={{paddingVertical:20}}>
            <View style={styles.line}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    line:{
        width:'100%',
        height:3,
        backgroundColor:'#E5E5E5'
    },
});
export default Line