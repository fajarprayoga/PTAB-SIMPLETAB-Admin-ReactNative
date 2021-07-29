import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import Select2 from 'react-native-select-two';
import { Btn, Dropdown, Footer, HeaderInput, Inpt, Spinner, Title, Txt, TxtArea } from '../../../component';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
const EditStaff =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    const actionStaff = route.params.action_staff;
    const action = route.params.action;
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        action_id : action.id,
        staff_id : actionStaff.id,
        status : '',
    })

    const handleAction =() => {
        console.log(actionStaff);
        if(form.status != ''){
            setLoading(true)
            API.actionStaffUpdate(form, TOKEN).then(result => {
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    navigation.navigate('StaffAction', {action_id : action.id})
                }
                setLoading(false)
            }) .catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        }else{
            alert('Mohon lengkapi data')
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
                                    <Title title='Edit Staff yang Bertugas' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt value={actionStaff.code} editable={false}/>
                                    <Txt title='Nama Pegawai'/>
                                    <Inpt value={actionStaff.name} editable={false}/>
                                    <Txt title='Deskripsi'/>
                                    <Inpt  value={action.description} editable={false} height ={100} textAlignVertical ='top'/>
                                    <Txt title='Status'/>
                                    <Select2
                                        searchPlaceHolderText='Cari Status'
                                        title={form.status != '' ? form.status : actionStaff.pivot.status}
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
                                        popupTitle='Ubah Status'
                                        data={[
                                            {'id' : 'close','name' : 'Close'},
                                            {'id' : 'pending','name' : 'Pending'},
                                            {'id' : 'active','name' : 'Active'},
                                        ]}
                                        onSelect={data => {
                                            setForm({...form, status : data[0]})
                                        }}
                                        onRemoveItem={data => {
                                            setForm({...form, status : data[0]})
                                        }} 
                                        selectButtonText ='Simpan'
                                        cancelButtonText='Batal'
                                    />
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

export default EditStaff