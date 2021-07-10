import React from 'react';
import {View,ScrollView,StyleSheet} from 'react-native';
import {Header,Inpt,Txt,In} from '../../component';
import { Distance } from '../../utils';

const Login =({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView>
                <Header text='Login'/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <View style={styles.baseBoxShadow} >
                            <View style={styles.boxShadow} >
                                <Txt title='Email'/>
                                <Inpt placeholder='Masukan Email'/>
                                <Txt title='Password'/>
                                <Inpt placeholder='Masukan Password' password={true}/>
                                <Distance distanceV={10}/>
                                <In title='Login' onPress={()=>navigation.navigate('Home')}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    baseBoxShadow : {
        alignItems : 'center',
        paddingVertical : 20
    },
    boxShadow : {
        top:-40,
        backgroundColor : '#ffffff',
        width : '100%',
        paddingHorizontal:20,
        paddingVertical : 30,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 3,
    },
    text:{
        fontSize:16, 
        color:'#696969',
        paddingTop : 20 
    }
})
export default Login