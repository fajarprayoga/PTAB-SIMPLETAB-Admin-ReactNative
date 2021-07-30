import { faCamera, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, PermissionsAndroid, ScrollView, StyleSheet, View , Image, Text, TouchableOpacity} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera } from 'react-native-image-picker';
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import { Btn, Footer, HeaderInput, Inpt, Spinner, Title, Txt, TxtArea } from '../../../component';
import Button from '../../../component/Button';
import VideoPlayer from '../../../component/Video';
import API from '../../../service';
import { colors, Distance } from '../../../utils';
import RNFetchBlob from 'react-native-fetch-blob';


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
            <View style={{flexDirection : 'row', marginHorizontal : 30, marginVertical : 10,}}>
                {(props.dataImage[qty-1] != null) &&
                <TouchableOpacity style={{backgroundColor :colors.primary, padding : 5, borderRadius : 5}} onPress={() => {setQty(qty + 1); setShow(true)}}>
                    <Text style={{color:'#ffffff', fontWeight : 'bold'}}>Add</Text>
                </TouchableOpacity>
                }
                <View style={{marginHorizontal:3}} />
                <TouchableOpacity style={{backgroundColor :colors.delete, padding : 5, borderRadius : 5}} onPress={() => {qty > 1 ? setQty(qty - 1) : alert('data tidak boleh dihapus'); props.deleteImage()}}>
                    <Text style={{color:'#ffffff', fontWeight : 'bold'}}>Delete </Text>
                </TouchableOpacity>
                <View style={{marginHorizontal:3}} />
                <TouchableOpacity style={{backgroundColor :colors.delete, padding : 5, borderRadius : 5}} onPress={() => {setQty(1); props.resetImage()}}>
                    <Text style={{color:'#ffffff', fontWeight : 'bold'}}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

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
    const [responses, setResponses] = useState([]);
    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            setLoading(true)

            Promise.all([API.categories(TOKEN),permissionGps()]).then((res) => {
                console.log('corrrrrr',res);
                setCategories(res[0].data)
                // setCustomers(res[1].data)

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


    
    // action
    const handleAction = () => {

        let dataUpload=[];
        let message = 'Mohon lengkapi data';
        let send = false;
        if((responses.length > 0 || responses.length <=3) && video !== null){
            if(video.fileSize <= 50000000){
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
                        },
                        {
                            name: 'form',
                            data : JSON.stringify(form)
                        },
                    ];
                send = true
            }else{
                message = 'max video 5mb'
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
                   console.log(result);
                   alert(data.message)
                   navigation.navigate('Menu')
               }).catch((e) => {
                   console.log(e);
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
                            console.log( 'posisiisii ', (position.coords.latitude));
                        //    return position;
                            // handleForm('lat',  positionNew.coords.latitude)
                            // handleForm('lng',  position.coords.longitude)
                            setForm({
                                ...form,
                                lat : position.coords.latitude,
                                lng : position.coords.longitude
                            })
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
                                    <Txt title='Nama Tiket'/>
                                    <Inpt placeholder='Masukan Nama Tiket' onChangeText={(item)=> handleForm('title', item)}/>
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi'  onChangeText={(item)=> handleForm('description', item)}/>
                                    <Txt title='Ambil Gambar'/>
                                    <ButtonImage Image ={getImage} dataImage = {responses} deleteImage={()=>deleteImage()} resetImage={() => resetImage()}/>
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
                                    {/* {customers && 
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
                                    }    */}
                                     <Inpt placeholder='Masukan Code Pelanggan' onChangeText={(item)=> handleForm('customer_id', item)}/>

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