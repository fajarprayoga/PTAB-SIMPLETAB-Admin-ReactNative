import React from 'react'
import {View,ImageBackground,StyleSheet,ScrollView,Image} from 'react-native'
import {HeaderView,DataView,Footer,Title} from '../../../component'

const ViewStaff =({navigation})=>{
    const image = require('../../../assets/img/BackgroundView.png')
    return(
        <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                <ScrollView >
                    <HeaderView/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <Title title='Detail Staff yang Bertugas' paddingVertical={5}/>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <DataView title='Status' txt='Pending'/>
                                    <DataView title='Deskripsi' txt='123'/>
                                    <DataView title='Kode' txt='STF00005'/>
                                    <DataView title='Staff' txt='Staff Distribusi 02'/>
                                    <DataView title='Departemen' txt='Distribusi'/>
                                    <DataView title='No Ponsel' txt='08723612332'/>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={navigation} focus='Home'/>
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

export default ViewStaff