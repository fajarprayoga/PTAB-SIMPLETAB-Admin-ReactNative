import React, { useEffect } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView,Image} from 'react-native'
import {HeaderView,DataView,Footer,Title} from '../../../component'

const ViewCustomer =({navigation, route})=>{
    const customer = route.params.customer
    const image = require('../../../assets/img/BackgroundView.png')
    return(
        <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                <ScrollView >
                    <HeaderView/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <Title title='Detail Pelanggan' paddingVertical={5}/>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <DataView title='Kode' txt={customer.code}/>
                                    <DataView title='Nama Lengkap' txt={customer.name}  />
                                    <DataView title='Email' txt={customer.email}/>
                                    <DataView title='Alamat' txt={customer.address} />
                                    <DataView title='Jenis Kelamin' txt={customer.gender}/>
                                    <DataView title='Tipe' txt={customer.type}/>
                                    <DataView title='No Ponsel' txt={customer.phone}/>
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

export default ViewCustomer