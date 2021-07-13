import React, { useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,TxtArea,Dropdown,Inpt, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';

const EditCustomer =({navigation, route})=>{
    const customer = route.params.customer
    const image = require('../../../assets/img/BackgroundInput.png')
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [form, setForm] = useState(route.params.customer)
    const [loading, setLoading] = useState(false)
    const handleForm = (key, value) => {
        setForm({
            ...form, 
            [key] : value
        })
    }

    const handleAction = () => {
        if(form.code !== '' && form.name !=='' && form.email !=='' && form.phone !=='' && form.type !=='' && form.address !=='' ){
            setLoading(true)
            API.customerEdit(form, TOKEN).then((result) => {
                console.log('message',result.message.constructor);
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
        }
    }

    DropDownPicker.setListMode("SCROLLVIEW");
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
                                    <Title title='Edit Pelanggan' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode' value={form.code} onChangeText={(item) => handleForm('code', item)} />
                                    <Txt title='Nama Lengkap'/>
                                    <Inpt placeholder='Masukan Nama Lengkap'  value={form.name} onChangeText={(item) => handleForm('name', item)} />
                                    <Txt title='Email'/>
                                    <Inpt placeholder='Email'  value={form.email} onChangeText={(item) => handleForm('email', item)}/>
                                    <Txt title='No Handphone'/>
                                    <Inpt placeholder='Masukan No Handphone'  value={form.phone} onChangeText={(item) => handleForm('phone', item)} />
                                    <Txt title='Tipe'/>
                                    <Dropdown
                                        placeholder={form.type}
                                        data={[
                                                {label: 'customer', value: 'customer'},
                                                {label: 'public', value: 'public'}                
                                            ]}
                                        onChangeValue={(item) => {
                                            handleForm('type', item)
                                        }}
                                    />
                                    <Txt title='Alamat'/>
                                    <TxtArea placeholder='Masukan Alamat' value={form.address} onChangeText={(item) => handleForm('address', item)} />
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

export default EditCustomer