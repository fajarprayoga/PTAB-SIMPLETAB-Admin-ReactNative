import React, { useEffect, useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,Inpt,Searchable, Spinner, Dropdown} from '../../../component'
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
import Select2 from 'react-native-select-two';
const AddStaff =({navigation})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [dapertement, setDapertement] = useState(null)
    const [subdapertement, setSubDapertement] = useState(null)
    const [filterSubDapertement, setFilterSubDapertement] = useState([])
    const [page, setPage] = useState(1)
    const [form, setForm] = useState({
        code : '',
        name : '',
        phone : '',
        dapertement_id : '',
        subdapertement_id : ''
    })  
    // DropDownPicker.setListMode("SCROLLVIEW");
    const USER = useSelector((state) => state.UserReducer);

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            console.log(TOKEN);
            Promise.all([API.dapertementsuser(USER.id,TOKEN), API.subdapertementslist({page:page,userid:USER.id},TOKEN)]).then(result => {
                let data = []
                result[0].data.map((item, index) => {
                    data[index]= {
                        'id' : item.id,
                        'name' : item.name
                    }
              
                })
                // console.log('hasil', result);
                setDapertement(data)
                setFilterSubDapertement(result[1].data.data);
            }).catch(e => console.log(e)).finally(f => setLoading(false))
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
        console.log(form);
        if(form.name !== '' && form.phone !='' && form.dapertement_id !='' && form.subdapertement_id !=''){
            setLoading(true)
            API.staffsCreate(form, TOKEN).then((result) => {
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    navigation.navigate('Staff')
                }
                console.log('hasil result',result)
                setLoading(false)
            } ).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        }
    }

    const filterSUb = (id) => {
        // if(form.dapertement_id != null && form.dapertement_id !=''){
            console.log('log filter',filterSubDapertement);
        // }
        let data = []
        filterSubDapertement.map((item, index) => {
            if(item.dapertement_id == id){
                data[index]= {
                    'id' : item.id,
                    'name' : item.name
                }
            }
        });

        setSubDapertement(data)
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
                                    {/* <ScrollView> */}
                                    <Title title='Tambah Staff' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode' onChangeText={(item) => handleForm('code', item)} />
                                    <Txt title='Staff'/>
                                    <Inpt placeholder='Masukan Nama Staff' onChangeText={(item) => handleForm('name', item)} />
                                    <Txt title='No Handphone'/>
                                    <Inpt placeholder='Masukan No Handphone' onChangeText={(item) => handleForm('phone', item)} keyboardType='number-pad' />
                                    <Txt title='Departemen'/>
                                    <View>
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
                                                handleForm('dapertement_id', data[0]);
                                                filterSUb(data);
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('dapertement_id', data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    }
                                    </View>
                                    <Txt title='Sub Dapertemen'/>
                                    {subdapertement && 
                                        <Select2
                                            searchPlaceHolderText='Cari Departemen'
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
                                            selectedTitleStyle={{
                                                    color:'#c4c4c4'
                                            }}
                                            colorTheme={'#0C5CBF'}
                                            popupTitle='Select Departemen'
                                            data={subdapertement}
                                            onSelect={data1 => {
                                                handleForm('subdapertement_id', data1[0])
                                            }}
                                            onRemoveItem={data1 => {
                                                handleForm('subdapertement_id', data1[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    }
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={handleAction}/>
                                        {/* <Btn title='Simpan' onPress={()=>console.log('data result',result)}/> */}
                                    </View>
                                    {/* </ScrollView> */}
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