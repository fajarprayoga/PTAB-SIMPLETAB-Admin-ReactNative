import React, { useEffect, useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,Inpt,Searchable, Spinner, Dropdown} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
const AddStaff =({navigation})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [dapertement, setDapertement] = useState(null)
    const [form, setForm] = useState({
        code : '',
        name : '',
        phone : '',
        dapertement_id : ''
    })  
    // DropDownPicker.setListMode("SCROLLVIEW");

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            API.dapertements(TOKEN).then((result) => {
                let data = []
                result.data.map((item, index) => {
                    data[index]= {
                        'label' : item.name,
                        'value' : item.id
                    }
                })
                setDapertement(data)
                console.log(data);
                setLoading(false)
                // console.log(result);
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        }
        return () => {
            isAmounted = false
        }
    }, [])


    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key] :value
        })
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
                                    <ScrollView>
                                    <Title title='Tambah Staff' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode'/>
                                    <Txt title='Staff'/>
                                    <Inpt placeholder='Masukan Nama Staff'/>
                                    <Txt title='No Handphone'/>
                                    <Inpt placeholder='Masukan No Handphone'/>
                                    <Txt title='Departemen'/>
                                    <View>
                                    {dapertement && <Dropdown
                                        placeholder='Pilih Tipe'
                                        data={dapertement}
                                        searchable={true}
                                        onChangeValue ={(item) => handleForm('type', item)}
                                    />}
                                    </View>
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={()=>console.log(dapertement)}/>
                                    </View>
                                    </ScrollView>
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
        justifyContent: "center",
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

export default AddStaff