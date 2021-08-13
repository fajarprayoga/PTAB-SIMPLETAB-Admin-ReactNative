import React, { useEffect, useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,TxtArea,Searchable, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
import Select2 from 'react-native-select-two';
import { counter } from '@fortawesome/fontawesome-svg-core';


const AddAction =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");

    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [dapertement, setDapertement] = useState(null)
    const [form, setForm] = useState({
        description : '',
        dapertement_id : route.params.ticket.dapertement_id,
        subdapertement_id : '',
        ticket_id : route.params.ticket.id
    })
    const [subdepartements, setSubdepartements] = useState(null)
    const USER = useSelector((state) => state.UserReducer);

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            Promise.all([API.subdapertementslist({userid:USER.id},TOKEN),API.dapertements(TOKEN)]).then((result) => {
                let data = []
                    result[0].data.map((item, index) => {
                    data[index]= {
                        'id' : item.id,
                        'name' : item.name
                    }
                })
                setSubdepartements(data)
                let data2 = []
                result[1].data.map((item, index) => {
                    data2[index]= {
                        'id' : item.id,
                        'name' : item.name
                    }
                })
                setDapertement(data2)
                // console.log(data2);
                setLoading(false)
                // console.log(result);
            }).catch((e) => {
                //console.log(e.request);
                setLoading(false)
            })

            console.log(route.params.ticket.id);
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

    const handleAction = () => {
        if(form.description !== '' && form.dapertement_id !== '' && form.subdapertement_id !== '' && form.ticket_id != null){
            setLoading(true)
            API.actionsCreate(form, TOKEN).then(result => {
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    navigation.navigate('Action', { ticket: route.params.ticket })
                }
                setLoading(false)
            }) .catch((e) => {
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
                                    <Title title='Tambah Tindakan' paddingVertical={5}/>
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi' onChangeText={item => handleForm('description', item)} />   

                                    <Txt title='Sub Departemen'/>
                                    {subdepartements && 
                                        <Select2
                                            searchPlaceHolderText='Cari Sub Departemen'
                                            title='Sub Departemen'
                                            
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
                                            colorTheme={'#0C5CBF'}
                                            popupTitle='Select Sub Departemen'
                                            data={subdepartements}
                                            onSelect={data => {
                                                handleForm('subdapertement_id', data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('subdapertement_id', data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    } 

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
                <Footer navigation={navigation} focus='Home'/>
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

export default AddAction