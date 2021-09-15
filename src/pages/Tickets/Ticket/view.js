import React, { useEffect, useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView,Image,Text,Modal,TouchableHighlight} from 'react-native'
import Config from 'react-native-config'
import {HeaderView,DataView,Footer,Title} from '../../../component'
import VideoPlayer from '../../../component/Video'
import ImageViewer from 'react-native-image-zoom-viewer';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons'


const ViewTicket =({navigation, route})=>{
    const image1 = require('../../../assets/img/BackgroundView.png')
    const [loading, setLoading] = useState(false)
    const [loadingImage, setLoadingImage] = useState(true)
    const [imageTicket, setImageTicket] = useState(JSON.parse(route.params.ticket.ticket_image[0].image))
    const ticket = route.params.ticket
    const [loadingVideo, setLoadingVideo] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [images, setImages] = useState([]);
    const [onFullScreen,setOnFullScreen] =useState(false)
    // const imagepengerjaan = ticket.action[0].image.length > 0 ? (JSON.parse(ticket.action[0].image)[0]) : null

    // const imagepengerjaan = ticket.action.length > 0 ? (JSON.parse(ticket.action[0].image)[0]) : null
    const [imagesPengerjaan, setImagesPengerjaan] = useState([]);
    const [panjang,setPanjang]= useState(ticket.action.length) ;
    const [ShowImagePengerjaan, setShowImagePengerjaan] = useState(false)
    // JSON.parse(ticket.action[panjang-1].image) : null
    const [imagePengerjaan,setimagePengerjaan] = useState(ticket.action.length > 0 ? (ticket.action[panjang-1].image != null && ticket.action[panjang-1].image !='' ?    JSON.parse(ticket.action[panjang-1].image) : null) : null )
    
    useEffect(() => {
       imageTicket.map((item, index) => {
           images.push({
            url: Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`,
           })
       })
     
    console.log('images looping', images);
       setLoading(false)
       
    }, [])
    useEffect(() => {
        console.log(imageTicket);
    }, [])

    

    useEffect(() => {
        if(imagePengerjaan != null){
          imagePengerjaan.map((item, index) => {
              imagesPengerjaan.push({
url: Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}?time="${new Date()}`,
              })
          })
   
        }
         setLoading(false)
      }, [])
    return(
        
        <View style={styles.container}>
                <ImageBackground source={image1} style={styles.image}>
                <ScrollView >
                    <HeaderView/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <Title title='Detail Tiket' paddingVertical={5}/>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <DataView title='Kode' txt={ticket.code}/>
                                    <DataView title='Nama Tiket' txt={ticket.title}/>
                                    <DataView title='Deskripsi' txt={ticket.description}/>
                                    <DataView title='Status' txt={ticket.status}/>
                                    <DataView title='Kategori' txt={ticket.category.name}/>
                                    <DataView title='Nama Pelanggan' txt={ticket.customer.name}  />
                                    <DataView title='Location' icon={faMapMarked} txt='Lihat Lokasi' color ='blue' onPress={()=>navigation.navigate('Maps', {lat : ticket.lat, lng : ticket.lng})}/>
                                    <DataView title='Bukti Foto Keluhan'/>
                                    <Modal visible={showImage} transparent={true} enablePreload={true}
                                        onRequestClose={() => setShowImage(false)}
                                        onDoubleClick={() => setShowImage(true)}
                                    >
                                        <ImageViewer imageUrls={images}/>
                                    </Modal>
                                    <TouchableHighlight onPress ={() =>{ setShowImage(true);console.log(images);}}>
                                    <ScrollView style={{flexDirection:'row',}}horizontal={true}>
                                    {/* {loadingImage && <Text style={{textAlign : 'center', fontSize : 17}}>Image Is Loading...</Text>} */}
                                    <ImageBackground source={require('../../../assets/img/ImageFotoLoading.png') } style={{ height : 220, width : 280}} >
                                    {
                                        imageTicket.map((item, index) => {
                                            return (
                                                <Image 
                                                    key={index} 
                                                    style={{height : 220, width : 280, marginVertical : 10}} 
                                                    source = {{uri : Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`}}
                                                    // onLoadEnd={() => setLoadingImage(false)}
                                                    // onLoadStart={() => setLoadingImage(true)}
                                                    />
                                            )
                                        })
                                    }
                                    </ImageBackground>
                                    </ScrollView> 
                                    </TouchableHighlight> 
                                    <DataView title='Bukti Video Keluhan' />
                                    <View style={{height : 250, width :'100%'}}>
                                        
                                        {ticket.video !='' && 
                                            <VideoPlayer
                                                src={{uri :  Config.REACT_APP_BASE_URL + `${String(ticket.video).replace('public/', '')}` }}
                                                onFullScreen = {()=> setOnFullScreen(true)}
                                                onLoad={() => {setLoadingVideo(loadingVideo ? false : true); return loadingVideo}} 
                                            />
                                        }
                                        {ticket.video =='' && 
                                           <Image 
                                                style={{height : 220, width : 280, marginVertical : 10}} 
                                                source = {require('../../../assets/img/ImageVideo.png')}
                                           />
                                        }
                                    </View>
                                    {/* <Text style={{fontSize:16, color:'#696969'}}>Bukti Foto Pengerjaan :</Text> */}
                                    {/* {ticket.action[0] &&
                                    <Image
                                    key={ticket.action[0].image.length > 0 ? Config.REACT_APP_BASE_URL + `${String(imagepengerjaan).replace('public/', '')}` : require('../../../assets/img/ImageFotoLoading.png')}
                                        source={ticket.action[0].image.length > 0?{ uri: Config.REACT_APP_BASE_URL + `${String(imagepengerjaan).replace('public/', '')}`} : require('../../../assets/img/ImageFotoLoading.png') }
                                        style={{ height : 220, width : 280 }} 
                                        // onLoadEnd={() => setLoadingImage(false)}
                                        // onLoadStart={() => setLoadingImage(true)}
                                    />
                                } */}

                                    {/* <Text onPress={()=>console.log('data ticket ini',ticket.action[0].image)}>Test</Text> */}

                                    <DataView title='Memo Pengerjaan' txt={ticket.action.length >0 ? ticket.action[panjang-1].memo : null}/>

                                    <DataView title='Foto Pengerjaan' />

                                    <Modal visible={ShowImagePengerjaan} transparent={true} enablePreload={true}
                                        onRequestClose={() => setShowImagePengerjaan(false)}
                                        onDoubleClick={() => setShowImagePengerjaan(true)}
                                    >
                                        <ImageViewer imageUrls={imagesPengerjaan}/>
                                    </Modal>
                                    <View style={{width:'90%'}}>
                                        <TouchableHighlight onPress ={imagePengerjaan != null ? () =>{ setShowImagePengerjaan(true);} : null}>
                                        <ScrollView style={{flexDirection:'row',}}horizontal={true}>
                                        <ImageBackground source={require('../../../assets/img/ImageFotoLoading.png') } style={{ height : 220, width : 280}} >
                                            {imagePengerjaan && imagePengerjaan.map((item,index) => {
                                                    return (
                                                        <View style={{marginVertical:5}}>
                                                            
                                                            <Image
                                                                key={index}
                                                                onLoadEnd={() => {setLoadingImage(false); console.log('end');}}
                                                                source = {{uri : Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}?time="${new Date()}`}}
                                                                style={{height: 220, width: 280, marginRight: 10, resizeMode : 'stretch'}}
                                                            /> 
                                                          
                                                        </View>
                                                        
                                                    )
                                                })} 
                                        </ImageBackground>
                                        </ScrollView>  
                                        </TouchableHighlight>
                                    </View>
                                   
                                    
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={navigation} focus='Home'/>
                
                </ImageBackground>
                {onFullScreen && <View style={{width:'100%', height:'100%'}} >
                <VideoPlayer
                    src={{uri :  Config.REACT_APP_BASE_URL + `${String(ticket.video).replace('public/', '')}` }}
                    onFullScreen = {() => setOnFullScreen (false)}
                    onLoad={() => {setLoadingVideo(loadingVideo ? false : true); return loadingVideo}}         
                  />
                </View>}
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

export default ViewTicket