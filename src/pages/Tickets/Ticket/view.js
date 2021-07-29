import React, { useEffect, useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView,Image} from 'react-native'
import Config from 'react-native-config'
import {HeaderView,DataView,Footer,Title} from '../../../component'
import VideoPlayer from '../../../component/Video'

const ViewTicket =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundView.png')
    const [imageTicket, setImageTicket] = useState(JSON.parse(route.params.ticket.ticket_image[0].image))
    const ticket = route.params.ticket
    const [loadingVideo, setLoadingVideo] = useState(false)
    useEffect(() => {
        console.log(imageTicket);
    }, [])
    return(
        <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                <ScrollView >
                    <HeaderView/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <Title title='Detail Tiket' paddingVertical={5}/>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <DataView title='Kode' txt={ticket.code}/>
                                    <DataView title='Nama Tiket' txt={ticket.title}/>
                                    <DataView title='Deskripsi' txt={Config.REACT_APP_BASE_URL + ticket.image}/>
                                    <DataView title='Status' txt={ticket.status}/>
                                    <DataView title='Kategori' txt={ticket.category.name}/>
                                    <DataView title='Nama Pelanggan' txt={ticket.customer.name}  />
                                    <DataView title='Loaction' txt='Lihat Lokasi' color ='blue' onPress={()=>navigation.navigate('Maps', {lat : ticket.lat, lng : ticket.lng})}/>
                                    <DataView title='Bukti Gambar'/>
                                    {imageTicket && 
                                        imageTicket.map((item, index) => {
                                            return (
                                                <Image key={index}  style={{height : 150, width : '100%', marginVertical : 10}} source = {{uri : Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`}}/>
                                            )
                                        })
                                    }
                                    <DataView title='Bukti Video' />
                                    <View style={{height : 150, height : 200}}>
                                        <VideoPlayer
                                        src={{uri :  Config.REACT_APP_BASE_URL + `${String(ticket.video).replace('public/', '')}` }}
                                        onFullScreen = {() => setOnFullScreen (true)}
                                        onLoad={() => {setLoadingVideo(loadingVideo ? false : true); return loadingVideo}} 
                                        
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={navigation} focus='Home'/>
                </ImageBackground>
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