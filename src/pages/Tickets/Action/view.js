import React, { useEffect, useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView,Image,Text,Modal,TouchableHighlight} from 'react-native'
import {HeaderView,DataView,Footer,Title, Spinner} from '../../../component'
import ImageViewer from 'react-native-image-zoom-viewer';
import Config from 'react-native-config'

const ViewAction =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundView.png')
   
    const action = route.params.action
    const [showImage, setShowImage] = useState(false)
    const [images, setImages] = useState([]);
    const [loading, setLoading]= useState(true)
    const [staffs, setStaffs] = useState(null)
    const [loadingImage, setLoadingImage] = useState(true)

    useEffect(() => {
        let data = []
        console.log(action);
        if(action.staff){
            action.staff.map((item ,index) => {
                data[index] = item.name
            })

            setStaffs(data)
            setLoading(false)
        }
        
    }, [])
    useEffect(() => {
        imageAction.map((item, index) => {
            images.push({
             url: Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`,
            })
        })
 
     console.log('images looping', images);
        setLoading(false)
        
     }, [])
     useEffect(() => {
         console.log(imageAction);
     }, [])
     
        const [imageAction, setImageAction] = useState(action.image!='' ? JSON.parse(route.params.action.image):[])
    
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
                <ImageBackground source={image} style={styles.image}>
                <ScrollView >
                    <HeaderView/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <Title title='Detail Tindakan' paddingVertical={5}/>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <DataView title='Status' txt={action.status}/>
                                    <DataView title='Deskripsi' txt={action.description}/>
                                    <DataView title='Pegawai' txt={staffs ? staffs.toString() : 'kosong'}/>
                                    <DataView title='Departemen' txt={action.dapertement.name}/>
                                    <DataView title='Tiket' txt={action.ticket.title}/>
                                    <DataView title='Waktu Mulai' txt={action.start}/>
                                    <DataView title='Waktu Selesai' txt={action.end}/>
                                    <DataView title='Foto'/>
                                    <Modal visible={showImage} transparent={true} enablePreload={true}
                                        onRequestClose={() => setShowImage(false)}
                                        onDoubleClick={() => setShowImage(true)}
                                    >
                                        <ImageViewer imageUrls={images}/>
                                    </Modal>
                                    <TouchableHighlight onPress ={() =>{ setShowImage(true);console.log(images);}}>
                                    <ScrollView style={{flexDirection:'row',}}horizontal={true}>

                                    {/* {loadingImage && <Text style={{textAlign : 'center', fontSize : 17}}>Image Is Loading...</Text>} */}
                                    {
                                        action.image != null ?
                                        imageAction.map((item, index) => {
                                            return (
                                                <Image 
                                                    key={index} 
                                                    style={{height : 220, width : 270, marginVertical : 10}} 
                                                    source = {{uri : Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}?time="${new Date()}`}}
                                                    onLoadEnd={() => setLoadingImage(false)}
                                                    onLoadStart={() => setLoadingImage(true)}
                                                    />
                                            )
                                        })
                                        :
                                        <Text>Kosong</Text>
                                    }
                                    </ScrollView> 
                                    </TouchableHighlight> 
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

export default ViewAction