import { faCamera, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, PermissionsAndroid, ScrollView, StyleSheet, View , Image} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera } from 'react-native-image-picker';
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import { Btn, Footer, HeaderInput, Inpt, Spinner, Title, Txt, TxtArea } from '../../../component';
import Button from '../../../component/Button';
import VideoPlayer from '../../../component/Video';
import API from '../../../service';
import { Distance } from '../../../utils';
import RNFetchBlob from 'react-native-fetch-blob';

const AddTicket =({navigation})=>{
    const imageBg = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(null)
    const [customers, setCustomers] = useState(null)
    // location 
    const [location, setLocation] = useState({
        latitude: 0.00000,
        longitude: 0.0000
    })
    const LATITUDE = -8.3978769;
    const LONGITUDE = 115.2141418;
    var defaultLoc = {};


    // form
    const [form, setForm] = useState({
        title : '',
        category_id : '',
        description : '',
        lat : '',
        lng : '',
        customer_id : '',
    })

    const [image, setImage] = useState({
        name : null,
        filename : null,
        data : null
    })
    const [video, setVideo] = useState(null)
    const [response, setResponse] = useState(null)
    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            setLoading(true)

            Promise.all([API.categories(TOKEN),API.customers(TOKEN),permissionGps()]).then((res) => {
                // console.log('corrrrrr',res);
                setCategories(res[0].data)
                setCustomers(res[1].data)
                // if(setSuccess){
                //     setLoading(false)
                // }
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
       }
    }, [])


    const handleForm = (key, value) => {
        setForm({
            ...form, 
            [key] : value
        })
    }

    
    // action
    const handleAction = () => {
        if(form.title != '' && form.category_id != '' && form.description != '' && response != null && video !==null ){
            if(video.fileSize < 98000000){
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
                    [
                      // name: image adalah nama properti dari api kita
                        {name: 'image', filename: response.fileName, data: response.base64},
                        { 
                            name : 'video', 
                            filename : video.fileName, 
                            type:'mp4', 
                            data: RNFetchBlob.wrap(video.uri)
                        },
                        {
                            name: 'form',
                            data : JSON.stringify(form)
                        }
                    ],
                ).then((result) => {
                    setLoading(false)
                    let data = JSON.parse(result.data);
                    console.log(result);
                    alert(data.message)
                    navigation.navigate('Menu')
                }).catch((e) => {
                    console.log(e);
                    setLoading(false)
                })
            }else{
                alert('Size video terlalu besar')
            }
           
        };
    }


    // location

    const permissionGps = () => {
        var positionNew = null;
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
          }).then(function(success) {
                requestLocationPermission().then(() => {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            console.log('posisi',position);
                            defaultLoc ={
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude, 
                            }
                            positionNew = position
                            console.log( typeof (position.coords.latitude));
                        //    return position;
                            handleForm('lat',  position.coords.latitude)
                            handleForm('lng',  position.coords.longitude)
                            setLoading(false)
                        },
                        (error) => {
                            console.log(error);    
                        },
                            { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
                        );

                })

          }).catch((error) => {
              console.log(error.message); // error.message => "disabled"
            //   navigation.navigate('Register')
          });
    }

    const requestLocationPermission =  async () => {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Location Permission',
              'message': 'MyMapApp needs access to your location'
            }
            )
    
           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               console.log("Location permission granted")
           } else {
               console.log("Location permission denied")
           }
        } catch (err) {
           console.warn(err)
        }
      }
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ImageBackground source={imageBg} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <HeaderInput/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <Title title='Tambah Tiket' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode' onChangeText={(item)=> handleForm('code', item)} />
                                    <Txt title='Nama Tiket'/>
                                    <Inpt placeholder='Masukan Nama Tiket' onChangeText={(item)=> handleForm('title', item)}/>
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi'  onChangeText={(item)=> handleForm('description', item)}/>
                                    <Txt title='Ambil Gambar'/>
                                    
                                    {response &&  
                                      <View style={{marginVertical:10,  height : 220, alignItems : 'center'}}>
                                        <Image
                                            style={{width:'100%', height: 220}}
                                            source={{uri : response.uri}}
                                        />
                                        </View>
                                    }
                                    <View style={{alignItems : 'center'}}>
                                        <Button
                                            title="Ambil Foto"
                                            width="80%"
                                            icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                                            onPress={()=>launchCamera(
                                                {
                                                    mediaType: 'photo',
                                                    includeBase64:true,
                                                    maxHeight: 500,
                                                    maxWidth: 500,
                                                },
                                                (response) => {
                                                    if(response.assets){
                                                        setResponse(response.assets[0]);
                                                        setImage({
                                                            name : 'img',
                                                            filename : response.assets[0].fileName,
                                                            data : response.assets[0].base64
                                                        })
                                                        setForm({
                                                            ...form,
                                                            image : response.assets[0].fileName
                                                        })
                                                        console.log(response);
                                                    }
                                                },  
                                            )}
                                        />
                                    </View>
                                    <Txt title='Ambil Video'/>
                                    <View style={{paddingVertical:10,  height : 220}}>
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
                                            icon = {<FontAwesomeIcon icon={faVideo} color='#ffffff'/>}
                                            onPress={ () => Alert.alert(
                                                'Peringatan',
                                                `Video tidak boleh lebih besar dari 10mb ! `,
                                                [
                                                    {
                                                        text : 'Tidak',
                                                        onPress : () => console.log('tidak')
                                                    },
                                                    {
                                                        text : 'Ya',
                                                        // onPress : () => {generateCodeOTP(); setModalVisible(true)}
                                                        onPress : () => {
                                                            launchCamera(
                                                                {
                                                                    mediaType: 'video',
                                                                    quality: 1,
                                                                    videoQuality: 'law'
                                                                    // includeBase64: true 
                                                                }, 
                                                                (response) => {
                                                                    if(response.assets){
                                                                        setVideo(response.assets[0]);
                                                                        setForm({
                                                                            ...form,
                                                                            video : response.assets[0].fileName
                                                                        })
                                                                        console.log(response.assets[0]);
                                                                    }
                                                            })
                                                        }
                                                    }
                                                ]
                                            )}
                                        />
                                    </View>
                                    <Txt title = 'Pelanggan'/>
                                    {customers && 
                                        <Select2
                                            searchPlaceHolderText='Cari Pelanggan'
                                            title='Pelanggan'
                                            isSelectSingle
                                            style={{ borderRadius: 5 }}
                                            colorTheme={'blue'}
                                            popupTitle='Select Pelanggan'
                                            data={customers}
                                            onSelect={data => {
                                                handleForm('customer_id', data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('customer_id', data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    }   
                                    <Txt title='Kategori'/>
                                    {categories && 
                                        <Select2
                                            searchPlaceHolderText='Cari Category'
                                            title='Category'
                                            isSelectSingle
                                            style={{ borderRadius: 5 }}
                                            colorTheme={'blue'}
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

export default AddTicket