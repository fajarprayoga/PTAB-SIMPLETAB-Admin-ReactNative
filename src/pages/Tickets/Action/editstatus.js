import { faCamera, faPlusCircle, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { launchCamera } from 'react-native-image-picker';
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import { Btn, Footer, HeaderInput, Inpt, Spinner, Title, Txt, TxtArea,ButtonIcon, } from '../../../component';
import Button from '../../../component/Button';
import API from '../../../service';
import { colors, Distance } from '../../../utils';
import Config from 'react-native-config'

const ButtonImage = (props) => {
    const [qty, setQty] = useState(1)
    const [show, setShow] = useState(true)
    var myloop = [];
    for(let index = 0; index < qty; index ++){
        myloop.push(
            <View key={index} >
                <View  style={{marginVertical:10,  height : 200, alignItems : 'center'}}>
                    <Image
                        style={{width:'90%', height: 200}}
                        source={props.dataImage[index]==null ? require('../../../assets/img/ImageFoto.png') :{uri: props.dataImage[index].uri}}
                    />
                </View>
                {props.dataImage[index]==null &&
                    <View style={{alignItems : 'center'}}>
                    <Button
                        onPress={() => {props.Image(); props.dataImage ? setShow(false) : null}}
                            title="Ambil Foto"
                            width="80%"
                            backgroundColor='#1DA0E0'
                            icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                        />
                      
                    </View>
                }
            </View>
        )
    }

    return (
        <View >
            {myloop}
            <View style={{alignItems:'center'}}>
        
            <View style={{flexDirection : 'row',alignItems:'center',flex:1, marginVertical:10}}>
                {(props.dataImage[qty-1] != null) &&
                <TouchableOpacity style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',backgroundColor :colors.success,paddingHorizontal:10, borderRadius : 5}} onPress={() => {setQty(qty + 1); setShow(true)}}>
                     <FontAwesomeIcon icon={faPlusCircle} size={20} color={'#FFFFFF'}/>
                    <Text style={{color:'#ffffff', fontWeight : 'bold',fontSize:15,  marginLeft:3}}>Tambah</Text>
                </TouchableOpacity>
                }
                <View style={{marginHorizontal:3}} />
                <TouchableOpacity style={{backgroundColor :colors.delete, flexDirection:'row',paddingHorizontal:10,height:40,justifyContent:'center',alignItems:'center', borderRadius : 5}} onPress={() => {qty > 1 ? setQty(qty - 1) : alert('data tidak boleh dihapus'); props.deleteImage()}}>
                        <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'}/>
                        <Text style={{color:'#ffffff', fontWeight : 'bold',fontSize:15,  marginLeft:3}}>Delete </Text>
                </TouchableOpacity>
                <View style={{marginHorizontal:3}} />
                <TouchableOpacity style={{backgroundColor :colors.detail, flexDirection:'row',paddingHorizontal:10,height:40,justifyContent:'center',alignItems:'center', borderRadius : 5}} onPress={() => {setQty(1); props.resetImage()}}>
                    <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'}/>
                    <Text style={{color:'#ffffff', fontWeight : 'bold'}}>Reset</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

const ButtonImageDone = (props) => {
    const [qtydone, setQtyDone] = useState(1)
    const [showDone, setShowDone] = useState(true)
    var myloopdone = [];
    for(let indexdone = 0; indexdone < qtydone; indexdone ++){
        myloopdone.push(
            <View key={indexdone} >
                <View  style={{marginVertical:10,  height : 200, alignItems : 'center'}}>
                    <Image
                        style={{width:'90%', height: 200}}
                        source={props.image_done[indexdone]==null ? require('../../../assets/img/ImageFoto.png') :{uri: props.image_done[indexdone].uri}}
                    />
                </View>
                {props.image_done[indexdone]==null &&
                    <View style={{alignItems : 'center'}}>
                    <Button
                        onPress={() => {props.ImageDone(); props.image_done ? setShowDone(false) : null}}
                            title="Ambil Foto"
                            width="80%"
                            backgroundColor='#1DA0E0'
                            icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                        />
                      
                    </View>
                }
            </View>
        )
    }

    return (
        <View >
            {myloopdone}
            <View style={{alignItems:'center'}}>
        
            <View style={{flexDirection : 'row',alignItems:'center',flex:1, marginVertical:10}}>
                {(props.image_done[qtydone-1] != null) &&
                <TouchableOpacity style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',backgroundColor :colors.success,paddingHorizontal:10, borderRadius : 5}} onPress={() => {setQtyDone(qtydone + 1); setShowDone(true)}}>
                     <FontAwesomeIcon icon={faPlusCircle} size={20} color={'#FFFFFF'}/>
                    <Text style={{color:'#ffffff', fontWeight : 'bold',fontSize:15,  marginLeft:3}}>Tambah</Text>
                </TouchableOpacity>
                }
                <View style={{marginHorizontal:3}} />
                <TouchableOpacity style={{backgroundColor :colors.delete, flexDirection:'row',paddingHorizontal:10,height:40,justifyContent:'center',alignItems:'center', borderRadius : 5}} onPress={() => {qtydone > 1 ? setQtyDone(qtydone - 1) : alert('data tidak boleh dihapus'); props.deleteImageDone()}}>
                        <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'}/>
                        <Text style={{color:'#ffffff', fontWeight : 'bold',fontSize:15,  marginLeft:3}}>Delete </Text>
                </TouchableOpacity>
                <View style={{marginHorizontal:3}} />
                <TouchableOpacity style={{backgroundColor :colors.detail, flexDirection:'row',paddingHorizontal:10,height:40,justifyContent:'center',alignItems:'center', borderRadius : 5}} onPress={() => {setQtyDone(1); props.resetImageDone()}}>
                    <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'}/>
                    <Text style={{color:'#ffffff', fontWeight : 'bold'}}>Reset</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}



const EditStaff =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    const action = route.params.item;
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        action_id : action.id,
        status : '',
        memo : '',
    })
 
    const [responses, setResponses] = useState([]);
    const [responses_frework, setResponsesFrework] = useState([]);
    const [responses_tools, setResponsesTools] = useState([]);
    const [responses_done, setResponsesDone] = useState([]);

    if(action.status == 'pending'){
        var dataStatus = [
            // {'id' : 'close','name' : 'Close'},
            {'id' : 'active','name' : 'Active'},
        ]
    } else if(action.status == 'close'){
        var dataStatus = [
            {'id' : 'close','name' : 'Close'},
            // {'id' : 'active','name' : 'Active'},
        ]
    }else if(action.status == 'active'){
        var dataStatus = [
            {'id' : 'active','name' : 'Active'},
            {'id' : 'close','name' : 'Close'},
        ]
    }
    const getImage = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64:true,
                maxHeight: 500,
                maxWidth: 500,
            },
            (response) => {
                if(response.assets){
                    let dataImage = response.assets[0];
                    setResponses([...responses, dataImage])
                }
            }
        )
    }

    const getImageDone = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64:true,
                maxHeight: 500,
                maxWidth: 500,
            },
            (response) => {
                if(response.assets){
                    let image_done = response.assets[0];
                    setResponsesDone([...responses_done, image_done])
                }
            }
        )
    }

    const deleteImage = () => {
        if (responses.length > 1) {
            const lastIndex = responses.length - 1;
            setResponses(responses.filter((item, index) => index !== lastIndex));
        }
    }

    const deleteImageDone = () => {
        if (responses_done.length > 1) {
            const lastIndexDone = responses_done.length - 1;
            setResponsesDone(responses_done.filter((item, indexdone) => indexdone !== lastIndexDone));
        }
    }

    const resetImage = () => {
        if (responses.length > 0) {
            setResponses([]);
        }
    }

    const resetImageDone = () => {
        if (responses_done.length > 0) {
            setResponsesDone([]);
        }
    }

    const handleForm = (key, value) => {
        setForm({
            ...form, 
            [key] : value
        })
    }


    const handleAction =() => {
        let dataUpload=[];
        let dataQtyImage = 1;
        if(form.status != '' && form.action_id != '' && form.staff_id != ''){
               if(action.status != form.status || form.status=='active'){
                   if(responses.length == 2){
                       setLoading(true)
                        dataUpload =       
                            [
                                {
                                    name: 'form',
                                    data : JSON.stringify(form)
                                },
                            ];

                        if(dataUpload.length != 0){
                            for (let index = 0; index < responses.length; index++) {
                                dataUpload.push(
                                    {
                                        'name' : 'image' + dataQtyImage,
                                        'filename' : responses[index].fileName,
                                        'data' : responses[index].base64
                                    }
                                )
                                dataQtyImage++;
                            }

                            RNFetchBlob.fetch(
                                'POST',
                                'https://simpletabadmin.ptab-vps.com/api/close/admin/actionStatusUpdate',
                                {
                                  Authorization: `Bearer ${TOKEN}`,
                                  otherHeader: 'foo',
                                  'Accept' : 'application/json' ,
                                  'Content-Type': 'multipart/form-data',
                                },
                                    dataUpload
                                ,
                            ).then((result) => {
                                setLoading(false)
                                let data = JSON.parse(result.data);
                                console.log(result);
                                alert(data.message)
                                navigation.navigate('Action')
                            }).catch((e) => {
                                console.log(e);
                                setLoading(false)
                            })
                            console.log(dataUpload);
                        }else{
                            alert('data masih kosong')
                        }
                    }else{
                        alert('harus ada 2 bukti Gambar')
                    }
                }else{
                    alert('status sudah '+ action.status+' tidak dapat dirubah')
                }
        }else{
            alert ('data tidak boleh kosong')
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
                                    <Txt title='Status'/>
                                    
                                    <Select2
                                        searchPlaceHolderText='Cari Status'
                                        title={form.status != '' ? form.status : action.status}
                                        isSelectSingle
                                        style={{
                                            borderRadius: 10,
                                            borderColor: '#087CDB',
                                            borderWidth: 1,
                                            height:50,
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
                                                color:'#696969',
                                        }}
                                        colorTheme={'#0C5CBF'}
                                        popupTitle='Ubah Status'
                                        data={dataStatus}
                                        onSelect={data => {
                                            setForm({...form, status : data[0]})
                                        }}
                                        onRemoveItem={data => {
                                            setForm({...form, status : data[0]})
                                        }} 
                                        selectButtonText ='Simpan'
                                        cancelButtonText='Batal'
                                    />
                                   
                                    {/* image upload */}

                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi'  onChangeText={(item)=> handleForm('memo', item)} value={form.memo} />
                                    {form.status != 'close' &&
                                    <View>
                                    <Txt title ='Foto Sebelum Pengerjaan'/>
                                    <View style={{alignItems:'center'}}>
                                            <Image
                                                style={{width:'90%', height: 200}}
                                                source={responses_frework[0]==null ? require('../../../assets/img/ImageFoto.png'): {uri:responses_frework[0].uri}}
                                            />
                                            <Distance distanceV={10}/>
                                            <Button
                                                onPress={() => launchCamera(
                                                    {
                                                        mediaType: 'photo',
                                                        includeBase64:true,
                                                        maxHeight: 500,
                                                        maxWidth: 500,
                                                    },
                                                    (response) => {
                                                        console.log('ini respon', response);
                                                        if(response.assets){
                                                            let image_prework = response.assets[0];
                                                            setResponsesFrework([...responses_frework, image_prework])
                                                          
                                                        }
                                                    }
                                                )}
                                                title="Ambil Foto"
                                                width="80%"
                                                backgroundColor='#1DA0E0'
                                                icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                                            />
                                          
                                    </View>
                                    <Txt title ='Foto Alat Pengerjaan'/>
                                    <View style={{alignItems:'center'}}>
                                        <Image
                                                style={{width:'90%', height: 200}}
                                                source={responses_tools[0]==null ? require('../../../assets/img/ImageFoto.png'): {uri:responses_tools[0].uri}}
                                            />
                                            <Distance distanceV={10}/>
                                            <Button
                                                onPress={() => launchCamera(
                                                    {
                                                        mediaType: 'photo',
                                                        includeBase64:true,
                                                        maxHeight: 500,
                                                        maxWidth: 500,
                                                    },
                                                    (response) => {
                                                        console.log('ini respon', response);
                                                        if(response.assets){
                                                            let image_tools = response.assets[0];
                                                            setResponsesTools([...responses_tools, image_tools])
                                                          
                                                        }
                                                    }
                                                )}
                                                title="Ambil Foto"
                                                width="80%"
                                                backgroundColor='#1DA0E0'
                                                icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                                            />
                                    </View>
                                    <Txt title='Foto Pengerjaan'/>
                                    <ButtonImage Image ={getImage} dataImage = {responses} deleteImage={()=>deleteImage()} resetImage={() => resetImage()}/>
                                    </View>
                                    }
                                    {form.status == 'close' &&
                                    <View>
                                        <Txt title='Foto Setelah Pengerjaan'/>
                                        <ButtonImageDone ImageDone ={getImageDone} image_done = {responses_done} deleteImageDone={()=>deleteImageDone()} resetImageDone={() => resetImageDone()}/>
                                    </View>
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

export default EditStaff