import React, { useState,useEffect } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,Inpt,TxtArea, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
import Select2 from 'react-native-select-two';


const AddSubDepartemen =({navigation})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    const [dapertement, setDapertement] = useState(null)
    const [form, setForm] = useState({
        code : '',
        name : '',
        description : '',
        dapertement_id : ''
    })

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            console.log(TOKEN);
            API.dapertements(TOKEN).then((result) => {
                let data = []
                result.data.map((item, index) => {
                    data[index]= {
                        'id' : item.id,
                        'name' : item.name
                    }
              
                })
                setDapertement(data)
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

    
    const handleAction =() => {
        if(form.name !== '' && form.description !== '' && form.dapertement_id !=''){
            setLoading(true)
            API.subdapertementsCreate(form,TOKEN).then((result) => {
                console.log('Tambah',result);
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    navigation.navigate('SubDepartemen')
                }
                setLoading(false)
            }).catch((e) => {
                setLoading(false)
                console.log(e.request);
            })
        }else{
            alert('Mohon Lengkapi Data Dahulu')
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
                                    <Title title='Tambah Sub Departemen' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode' onChangeText={(item) => handleForm('code', item)}/>
                                    <Txt title='Sub Departemen'/>
                                    <Inpt placeholder='Masukan Nama Sub Departemen' onChangeText={(item) => handleForm('name', item)}/>
                                    <Txt title='Departemen'/>
                                    {dapertement && 
                                        <Select2
                                            searchPlaceHolderText='Cari Departemen'
                                            title='Departemen'
                                            isSelectSingle
                                            style={{
                                                borderRadius: 10,
                                                borderColor: '#087CDB',
                                                borderWidth: 1,
                                                height:50
                                            }}
                                            buttonStyle={{ 
                                                    backgroundColor:'#0C5CBF',
                                                    height:45,
                                                    borderRadius:5
                                            }}
                                            buttonTextStyle={{
                                                    color:'#FFFFFF'                                        
                                            }}
                                            selectedTitleStyle={{
                                                    color:'#c4c4c4'
                                            }}
                                            colorTheme={'#0C5CBF'}
                                            popupTitle='Select Departemen'
                                            data={dapertement}
                                            onSelect={data => {
                                                handleForm('dapertement_id', data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('dapertement_id', data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    }
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi' onChangeText={(item) => handleForm('description', item)}/>
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

export default AddSubDepartemen