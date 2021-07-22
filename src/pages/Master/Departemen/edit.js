import React, { useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,Inpt,TxtArea, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
const EditDepartemen =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    const [dapertement, setDapertement]  = useState(route.params.dapertement)

    const handleForm = (key, value) => {
        setDapertement({
            ...dapertement,
            [key] :value
        })
    }

    const handleAction= () => {
        if(dapertement.code !== '' && dapertement.name !=='' && dapertement.description !==''){
            setLoading(true)
            API.dapertementsEdit(dapertement, TOKEN).then((result) => {
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    navigation.navigate('Departemen')
                }
                console.log(result);
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
                                    <Title title='Edit Departemen' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode' value ={dapertement.code} onChangeText={(item) => handleForm('code', item)}/>
                                    <Txt title='Departemen'/>
                                    <Inpt placeholder='Masukan Nama Departemen' value ={dapertement.name} onChangeText={(item) => handleForm('name', item)}/>
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi' value ={dapertement.description} onChangeText={(item) => handleForm('description', item)}/>
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

export default EditDepartemen