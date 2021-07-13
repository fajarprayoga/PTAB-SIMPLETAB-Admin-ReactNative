import React, { useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,TxtArea,Dropdown,Inpt, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';

const AddCustomer =({navigation})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const [loading, setLoading] = useState(false)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [form, setForm] = useState({
        code : '',
        name : '',
        email : '',
        password : '',
        phone : '',
        type : '',
        address : '',
        gender : ''
    })
    const handleForm =(key, value) => {
        setForm({
            ...form,
            [key] : value
        })
    }

    const handleAction =() => {
        if(form.name !== '' && form.password !=='' && form.phone!== '' && form.type !== '' && form.address !=='' ){
            
            setLoading(true)
            API.customerCreate(form, TOKEN).then((result) => {
                console.log(result);
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                 }else{
                    alert(result.message)
                 }
                 setLoading(false)
                 navigation.navigate('Customer')
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        }else{
            alert('mohon lengkapi data terlebih dahulu')
        }
    }
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ImageBackground source={image} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <HeaderInput/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <Title title='Tambah Pelanggan' paddingVertical={5}/>
                                    <Txt title='Kode' />
                                    <Inpt placeholder='Masukan Kode' onChangeText={(item) => handleForm('code', item)} />
                                    <Txt title='Nama Lengkap'/>
                                    <Inpt placeholder='Masukan Nama Lengkap' onChangeText={(item) => handleForm('name', item)} />
                                    <Txt title='Email'/>
                                    <Inpt placeholder='Email' onChangeText={(item) => handleForm('email', item)} />
                                    <Txt title='Kata Sandi'/>
                                    <Inpt placeholder='Masukan Kata Sandi' secureTextEntry={true} onChangeText={(item) => handleForm('password', item)} />
                                    <Txt title='Tipe'/>
                                    <Dropdown
                                        placeholder='Pilih Tipe'
                                        data={[
                                            {label: 'Pelanggan', value: 'customer'},
                                            {label: 'Umum', value: 'public'}                
                                        ]}
                                        onChangeValue ={(item) => handleForm('type', item)}
                                    />
                                    <Txt title='No Handphone'/>
                                    <Inpt placeholder='Masukan No Handphone' onChangeText={(item) => handleForm('phone', item)} keyboardType='number-pad' />
                                    <Txt title='Jenis Kelamin'/>
                                      <Dropdown
                                        placeholder='Pilih Jenis Kelamin'
                                        data={[
                                                {label: 'Laki Laki', value: 'male'},
                                                {label: 'Perempuan', value: 'female'}                
                                            ]}
                                        onChangeValue={(item) => {
                                            handleForm('gender', item)
                                        }}
                                    />
                                    <Txt title='Alamat'/>
                                    <TxtArea placeholder='Masukan Alamat' onChangeText={(item) => handleForm('address', item)} />
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={handleAction}/>
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