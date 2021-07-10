import React from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,TxtArea,Dropdown,Inpt} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';

const AddCustomer =({navigation})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <HeaderInput/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <Title title='Tambah Pelanggan' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode'/>
                                    <Txt title='Nama Lengkap'/>
                                    <Inpt placeholder='Masukan Nama Lengkap'/>
                                    <Txt title='Email'/>
                                    <Inpt placeholder='Email'/>
                                    <Txt title='Kata Sandi'/>
                                    <Inpt placeholder='Masukan Kata Sandi' password={true}/>
                                    <Txt title='No Handphone'/>
                                    <Inpt placeholder='Masukan No Handphone'/>
                                    <Txt title='Tipe'/>
                                    <Dropdown
                                        placeholder='Pilih Tipe'
                                        data={[
                                                {label: 'Pelanggan', value: 'Pelanggan'},
                                                {label: 'Umum', value: 'Umum'}                
                                            ]}
                                    />
                                    <Txt title='Alamat'/>
                                    <TxtArea placeholder='Masukan Alamat'/>
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={()=>navigation.navigate('Customer')}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
                <Footer navigation={navigation} focus='Menu'/>
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

export default AddCustomer