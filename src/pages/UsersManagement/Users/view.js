import React from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderView,DataView,Footer,Title} from '../../../component'

const ViewTicket =({navigation})=>{
    const image = require('../../../assets/img/BackgroundView.png')
    return(
        <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                <ScrollView >
                    <HeaderView/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <Title title='Detail Users' paddingVertical={5}/>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <DataView title='Name' txt='Master'/>
                                    <DataView title='Email' txt='PutuAlgoritma@gmail.com'/>
                                    <DataView title='Email verifed at' txt=''/>
                                    <DataView title='Roles' txt='Admin'/>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={navigation} focus='Menu'/>
                </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    baseBoxShadow : {
        alignItems : 'center',
        paddingVertical : 20,
    },
    boxShadow : {
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
    }
})

export default ViewTicket