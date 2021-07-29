import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import { Btn, Footer, HeaderInput, Inpt, Spinner, Title, Txt, TxtArea } from '../../../component';
import API from '../../../service';
import { Distance } from '../../../utils';

const EditTicket =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            setLoading(true)

            Promise.all([API.categories(TOKEN)]).then((res) => {
                // console.log('corrrrrr',res);
                setCategories(res[0].data)
                // if(setSuccess){
                //     setLoading(false)
                // }
                setLoading(false)
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
       }
    }, [])

    const [form, setForm] = useState({
        id : route.params.ticket.id,
        title : route.params.ticket.title,
        description : route.params.ticket.description,
        category_id : route.params.ticket.category_id
    })

    const handleForm = (key, value) => {
        setForm({
            ...form, 
            [key] : value
        })
    }

    const handleAction = () => {
        if(form.title !== '' && form.description != '' && form.category_id != ''){
            setLoading(true)
            API.ticketsEdit(form, TOKEN).then((result) => {
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    navigation.navigate('Ticket')
                }
                setLoading(false)
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        }else{
            alert('Mohon lengkapi data ')
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
                                    <Title title='Edit Tiket' paddingVertical={5}/>
                                   
                                    <Txt title='Nama Tiket'/>
                                    <Inpt placeholder='Masukan Nama Tiket' onChangeText={(item)=> handleForm('title', item)} value={form.title} />
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi'  onChangeText={(item)=> handleForm('description', item)} value={form.description} />
                                  
                                    <Txt title='Kategori'/>
                                    {categories && 
                                        <Select2
                                            searchPlaceHolderText='Cari Category'
                                            title={route.params.ticket.category.name}
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
                                            popupTitle='Select Category'
                                            data={categories}
                                            onSelect={data => {
                                                handleForm('category_id', data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('category_id', data[0])
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

export default EditTicket