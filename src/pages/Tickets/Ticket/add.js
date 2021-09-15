import { faCamera, faVideo,faPlusCircle,faPlus,faTrash,faUndo, faFileImage, faImage,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, PermissionsAndroid, ScrollView, StyleSheet, View , Image, Text, TouchableOpacity} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import { Btn, Footer, HeaderInput, Inpt, SelectCustomer, Spinner, Title, Txt, TxtArea } from '../../../component';
import Button from '../../../component/Button';
import VideoPlayer from '../../../component/Video';
import API from '../../../service';
import { colors, Distance } from '../../../utils';
import RNFetchBlob from 'react-native-fetch-blob';
import { useIsFocused } from '@react-navigation/native';




const ButtonImage = (props) => {
    const [qty, setQty] = useState(1)
    const [show, setShow] = useState(true)
    var myloop = [];
    for(let index = 0; index < qty; index ++){
        myloop.push(
            <View key={index} >
                <View  style={{marginVertical:10,  height : 200, alignItems : 'center'}}>
                    <Image
                        style={{width:'98%', height: 200}}
                        source={props.dataImage[index]==null ? require('../../../assets/img/ImageFoto.png') :{uri: props.dataImage[index].uri}}
                    />
                </View>
                <View style={{alignItems : 'center'}}>
                    <Button
                        // onPress={() => {props.Image(); props.dataImage ? setShow(false) : null}}
                            onPress={() => {
                                Alert.alert(
                                    'Bukti Foto',
                                    `Galery atau Camera? `,
                                    [
                                        {
                                            text : 'Galery',
                                            onPress : () => props.ImageGalery()
                                        },
                                        {
                                            text : 'Camera',
                                            onPress : () => props.Image()
                                        }
                                    ]
                                );
                                props.dataImage ? setShow(false) : null

                            }}
                            title="Ambil Foto"
                            width="80%"
                            backgroundColor='#1DA0E0'
                            icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                        />
                </View>
                <Distance distanceV={5}/>    
                {/* {props.dataImage[index]==null &&
                    <View style={{alignItems : 'center'}}>
                        <Button
                            onPress={() => {props.Image(); props.dataImage ? setShow(false) : null}}
                            title="Ambil Foto"
                            width="80%"
                            backgroundColor='#1DA0E0'
                            icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                        />
                    </View>
                } */}
            </View>
        )
    }

    return (
       
        <View >
            
            {myloop}
            <View style={{flexDirection : 'row',alignItems:'center', width:'80%', marginVertical:10}}>
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
    )
}

const AddTicket =({navigation, route})=>{
    const imageBg = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(null)
    const [customers, setCustomers] = useState(null)
    const [selectVisibleCustomer, setSelectVisibleCustomer] = useState(false)
    var defaultLoc = {};
    const USER = useSelector((state) => state.UserReducer);
    const formParams= route.params ? route.params.ticket : ''
    const [statusGps, setStatusGps] = useState('disabled')
    // form
    const [form, setForm] = useState({
        title : formParams.title ? formParams.title :'',
        category_id : formParams.category_id ? formParams.category_id :  '',
        description : formParams.description ? formParams.description :  '',
        lat : formParams.lat ? formParams.lat :  '',
        lng : formParams.lng ? formParams.lng :  '',
        customer_id : formParams.customer_id ? formParams.customer_id :  '',
        dapertement_id : USER.dapertement_id,
    })

    const [image, setImage] = useState({
        name : null,
        filename : null,
        data : null
    })
    const [video, setVideo] = useState(null)
    const [response, setResponse] = useState(null)
    const [responses, setResponses] = useState([]);
    const isFocused = useIsFocused()

    useEffect(() => {
        // if(isFocused){
        setLoading(true)
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
        }).then(function(success) { 
            setStatusGps(success.status)
            Promise.all([API.categories(TOKEN),requestLocationPermission()]).then((res) => {
                console.log('corrrrrr',res);
                setCategories(res[0].data)
                Geolocation.getCurrentPosition(
                (position) => {
                    // console.log('posisi',position);
                    defaultLoc ={
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude, 
                    }
                    // positionNew = position
                    console.log( 'posisiisii ', (position.coords.latitude));
                    setForm({
                        ...form,
                        lat : position.coords.latitude,
                        lng : position.coords.longitude
                    })
                    setLoading(false)
                },
                (error) => {
                    console.log(error);    
                    setLoading(false)
                },
                    { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, accuracy : 'high'},
                );
            }).catch((e) => {
                // console.log(e);
                setLoading(false)
            })
        }).catch((error) => {
          
            API.categories(TOKEN).then((result) => {
                setCategories(result.data)
            }).catch(e => {
                alert('categories error')
                console.log(e);
            }).finally(f =>{  setStatusGps(error.message); setLoading(false) })
        });
    //    }
    }, [])

    useEffect(() => {
        if(isFocused){
            setForm({
                ...form,
                title : formParams.title ? formParams.title :'',
                category_id : formParams.category_id ? formParams.category_id :  '',
                description : formParams.description ? formParams.description :  '',
                lat : formParams.lat ? formParams.lat :  '',
                lng : formParams.lng ? formParams.lng :  '',
                customer_id : formParams.customer_id ? formParams.customer_id :  '',
                dapertement_id : USER.dapertement_id,
            })
        }
    }, [isFocused])


    const handleForm = (key, value) => {
        setForm({
            ...form, 
            [key] : value
        })
    }


    // get image 

    

    
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

        
    const getImageGalery = () => {
        launchImageLibrary(
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



const getVideo = () =>{
        launchCamera(
            {
                mediaType: 'video',
                quality: 1,
                videoQuality: 'high'
                // includeBase64: true 
            }, 
            (response) => {
                if(response.assets){
                    setVideo(response.assets[0]);
                    setForm({
                        ...form,
                        video : response.assets[0].fileName
                    })
                    // console.log(response.assets[0]);
                }
        })
    }
    const getVideoGalery = () => {
        launchImageLibrary(
            {
                mediaType: 'video',
                quality: 1,
                videoQuality: 'high'
            },
            (response) => {
                if(response.assets){
                    setVideo(response.assets[0]);
                    setForm({
                        ...form,
                        video : response.assets[0].fileName
                    })
                    // console.log(response.assets[0]);
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

    const resetImage = () => {
        if (responses.length > 0) {
            setResponses([]);
        }
    }


    const handleData = (position =null) => {
          let dataUpload=[];
          let data = form;
          if(position!=null){
              data.lat= position.coords.latitude
              data.lng= position.coords.longitude 
            }
            console.log('position', data.lat +' '+data.lng );
            
        let message = 'Mohon lengkapi data';
        let send = false;
        if((responses.length > 0 && responses.length <=3) && video !== null){
            if(video.fileSize <= 20000000){
                dataUpload =       
                    [
                        // name: image adalah nama properti dari api kita
                        {
                            name: 'qtyImage',
                            data : JSON.stringify(responses.length)
                        },
                        { 
                            name : 'video', 
                            filename : video.fileName, 
                            type:'mp4', 
                            data: RNFetchBlob.wrap(video.uri)
                            // String(imagefoto).replace('public/', '')
                            // data : "RNFetchBlob-file://"+video.uri
                        },
                        {
                            name: 'form',
                            data : JSON.stringify(form)
                        },
                    ];
                send = true
            }else{
                message = 'max video 20 mb'
            }
       
        }else  if(responses.length >= 2 && responses.length <= 3){
            dataUpload =       
            [
                // name: image adalah nama properti dari api kita
                {
                    name: 'qtyImage',
                    data : JSON.stringify(responses.length)
                    },
                    {
                        name: 'form',
                        data : JSON.stringify(form)
                    },
            ];
            send = true;
            
        }
       
        let dataQtyImage = 1;
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
       

        if(form.title != '' && form.category_id != '' && form.description != '' && form.customer_id != '' && form.lat != '' && form.lng !='' ){

            if(send){
               setLoading(true)
               RNFetchBlob.fetch(
                   'POST',
                   'https://simpletabadmin.ptab-vps.com/api/close/admin/tickets',
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
                   console.log(data);
                   alert(data.message)
                   navigation.navigate('Menu')
               }).catch((e) => {
                //    console.log(e);
                   setLoading(false)
               })
            }else{
                if(video != null && responses.length <1){
                    message = 'mohon gambar diisi min 1'
                }
                if(video == null && responses.length <=2){
                    message = 'Mohon isi gambar min 2 jika tidak tersedia video'
                }
                if(video == null && responses.length >= 3){
                    message = 'Max upload 3 gambar'
                }

                alert(message)
            }
        }else{
            alert('Mohon Lengkapi data')
        }
    }
    
    // action
    const handleAction = () => {
 
        if(statusGps != 'disabled'){
            handleData()
        }else{
            setLoading(true)
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                ok: "YES",
                cancel: "NO",
            }).then(function(success) { 
                setStatusGps(success.status)
                Promise.all([requestLocationPermission()]).then((res) => {
                    // console.log('corrrrrr',res);
                    Geolocation.getCurrentPosition(
                    (position) => {
                        // console.log('posisi',position);
                        defaultLoc ={
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude, 
                        }
                        // positionNew = position
                        console.log( 'posisiisii ', (position.coords.latitude));
                        setForm({
                            ...form,
                            lat : position.coords.latitude,
                            lng : position.coords.longitude
                        })
                       handleData(position)
                    },
                    (error) => {
                        console.log(error);    
                        setLoading(false)
                    },
                        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, accuracy : 'high'},
                    );
                }).catch((e) => {
                    console.log(e);
                    setLoading(false)
                })
            }).catch((error) => {
                console.log(error.message); // error.message => "disabled"
                //   navigation.navigate('Register')
                setStatusGps(error.message)
                setLoading(false)
            });
        }
      
    }


    // location

    // const permissionGps = () => {
    //     var positionNew = null;
    //     LocationServicesDialogBox.checkLocationServicesIsEnabled({
    //         message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
    //         ok: "YES",
    //         cancel: "NO",
    //       }).then(function(success) {
    //             requestLocationPermission().then(() => {
    //                 Geolocation.getCurrentPosition(
    //                     (position) => {
    //                         // console.log('posisi',position);
    //                         defaultLoc ={
    //                             latitude: position.coords.latitude,
    //                             longitude: position.coords.longitude, 
    //                         }
    //                         positionNew = position
    //                         alert( 'posisiisii ', (position.coords.latitude));
    //                     //    return position;
    //                         // handleForm('lat',  positionNew.coords.latitude)
    //                         // handleForm('lng',  position.coords.longitude)
    //                         setForm({
    //                             ...form,
    //                             lat : position.coords.latitude,
    //                             lng : position.coords.longitude
    //                         })
    //                         setLoading(false)
    //                     },
    //                     (error) => {
    //                         // console.log(error);    
    //                     },
    //                         { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, accuracy : 'high'},
    //                     );

    //             })

    //       }).catch((error) => {
    //           console.log(error.message); // error.message => "disabled"
    //         //   navigation.navigate('Register')
    //       });
    // }
    const requestLocationPermission =  async () => {
        let info ='';
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                'title': 'Location Permission',
                'message': 'MyMapApp needs access to your location'
              }
            )
    
           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //   setEnableLocation(true)
           } else {
            //   setEnableLocation(false)
           }
        } catch (err) {
            info=1
        }
      }

    // const requestLocationPermission =  async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           'title': 'Location Permission',
    //           'message': 'MyMapApp needs access to your location'
    //         }
    //         )
    
    //        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         //    console.log("Location permission granted")
    //        } else {
    //         //    console.log("Location permission denied")
    //        }
    //     } catch (err) {
    //        console.warn(err)
    //     }
    //   }


    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            {selectVisibleCustomer && <SelectCustomer/>}
            <ImageBackground source={imageBg} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <HeaderInput/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <Title title='Tambah Tiket' paddingVertical={5}/>
                                    <Txt title='Nama Tiket'/>
                                    <Inpt placeholder='Masukan Nama Tiket' onChangeText={(item)=> handleForm('title', item)}/>
                                    <Txt title = 'Pelanggan'/>
                                    <TouchableOpacity style={styles.btnPelanggan}   onPress={() => navigation.navigate('SelectCustomer', {ticket : form})}>
                                        <Text style={{ color:'#918F8FFF' }}>{formParams.customer_name ? formParams.customer_name : 'Pilih Pelanggan'}</Text>
                                    </TouchableOpacity>
                                    <Txt title='Kategori'/>
                                    {categories && 
                                        <Select2
                                            searchPlaceHolderText='Cari Category'
                                            title='Category'
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
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi'  onChangeText={(item)=> handleForm('description', item)}/>
                                    <Txt title='Ambil Gambar'/>
                                    <ButtonImage Image ={getImage} ImageGalery={getImageGalery} dataImage = {responses} deleteImage={()=>deleteImage()} resetImage={() => resetImage()}/>
                                    
                                    
                                    <Txt title='Ambil Video'/>
                                    <View style={{paddingVertical:10,  height : 220}}>
                                    {video == null && (
                                        <View style={{alignItems:'center'}}>
                                        <Image source={require('../../../assets/img/ImageVideo.png')}style={{width:'90%',height:150}}  />
                                    </View>
                                    )}
                                        {video && (
                                            <VideoPlayer
                                                src={{uri: video.uri}}
                                            />
                                            
                                        )}
                                    </View>
                                    
                                    
                                    <View style={{alignItems : 'center'}}>
                                        <Button
                                            title="Ambil Video"
                                            width="80%"
                                            backgroundColor='#1DA0E0'
                                            icon = {<FontAwesomeIcon icon={faVideo} color='#ffffff'/>}
                                            onPress={ () => (form.customer_id =='' || form.customer_id==null ? alert('Mohon piling Pelanggan dahulu') :
                                                Alert.alert(
                                                    'Peringatan',
                                                    `Video tidak boleh lebih besar dari 5mb ! `,
                                                    [
                                                        {
                                                            text : 'Tidak',
                                                            // onPress : () => console.log('tidak')
                                                        },
                                                        {
                                                            text : 'Ya',
                                                            // onPress : () => {generateCodeOTP(); setModalVisible(true)}
                                                            onPress : () => 

                                                            launchCamera(
                                                                {
                                                                    mediaType: 'video',
                                                                    quality: 1,
                                                                    videoQuality: 'high'
                                                                    // includeBase64: true 
                                                                }, 
                                                                (response) => {
                                                                    if(response.assets){
                                                                        setVideo(response.assets[0]);
                                                                        setForm({
                                                                            ...form,
                                                                            video : response.assets[0].fileName
                                                                        })
                                                                        // console.log(response.assets[0]);
                                                                    }
                                                            })
                                                            
                                                            // Alert.alert(
                                                            //     'Bukti Video',
                                                            //     `Galery atau Camera? `,
                                                            //     [
                                                            //         {
                                                            //             text : 'Galery',
                                                            //             onPress : () => getVideoGalery()
                                                            //         },
                                                            //         {
                                                            //             text : 'Camera',
                                                            //             onPress : () => getVideo()
                                                            //         }
                                                            //     ]
                                                            // )
                                                        }
                                                    ]
                                                )
                                            )}
                                        />
                                    </View>
                               

                                       
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
    },
    btnPelanggan : {
        borderWidth:1,
        padding : 15,
        borderRadius : 10,
        borderColor : '#918F8FFF',
        borderColor : colors.border
    },
    
})

export default AddTicket