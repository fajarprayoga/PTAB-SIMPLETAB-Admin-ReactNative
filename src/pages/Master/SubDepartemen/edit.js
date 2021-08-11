import React, { useState,useEffect } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,Inpt,TxtArea, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
import Select2 from 'react-native-select-two';

const EditSubDepartemen =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    const [subdapertement, setSubDapertement]  = useState(route.params.subdapertement)
    const [dapertement, setDapertement] = useState(null)

    const handleForm = (key, value) => {
        setSubDapertement({
            ...subdapertement,
            [key] :value
        })
    }
    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            API.dapertements(TOKEN).then((result) => {
                let data = []
                result.data.map((item, index) => {
                    data[index]= {
                        'id' : item.id,
                        'name' : item.name
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

    const handleAction= () => {
        if(subdapertement.code !== '' && subdapertement.name !=='' && subdapertement.description !=='' && subdapertement.dapertement.id !=='' ){
            setLoading(true)
            API.subdapertementsEdit(subdapertement, TOKEN).then((result) => {
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    navigation.navigate('SubDepartemen')
                }
                console.log('hasilnya',result);
                setLoading(false)
            }).catch(e => {
                console.log(e.request);
                setLoading(false)
            })
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
                                    <Title title='Edit Sub Departemen' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode' value ={subdapertement.code} onChangeText={(item) => handleForm('code', item)}/>
                                    <Txt title='Sub Departemen'/>
                                    <Inpt placeholder='Masukan Nama Sub Departemen' value ={subdapertement.name} onChangeText={(item) => handleForm('name', item)}/>
                                    <Txt title='Departemen'/>
                                    {dapertement &&  <Select2   
                                        searchPlaceHolderText='Cari Departemen'
                                        title={route.params.subdapertement.dapertement.name}
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
                                                color:'#696969'
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
                                    />}
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi' value ={subdapertement.description} onChangeText={(item) => handleForm('description', item)}/>
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={handleAction}/>
                                        {/* <Btn title='Simpan' onPress={()=>console.log('departemen ini2',route.params.subdapertement)}/> */}
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

export default EditSubDepartemen