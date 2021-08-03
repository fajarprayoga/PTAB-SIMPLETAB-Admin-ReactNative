import React,{useState} from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import Config from 'react-native-config';
import Distance from '../../utils/distance';
import { BtnDelete,BtnAction,BtnDetail,BtnEdit } from '../index';


const PageTicket =(props)=>{
    const {navigation} = props;
    const ticket = props.data;
    const image = JSON.parse(props.data.ticket_image[0].image);
    const [loadingImage, setLoadingImage] = useState(true)
    var colorStatus = '';
    var borderStatus ='';
    if(ticket.status == 'active'){
        var colorStatus = '#7DE74B';
        var borderStatus = '#CAFEC0'
        
    }else if(ticket.status == 'pending'){
        var colorStatus = '#F0D63C';
        var borderStatus = '#FFF6C2'
    }else{
        var colorStatus = '#2392D7';
        var borderStatus ='#CFEDFF'
    }
    return(
       <View>
           <Distance distanceV={5}/>
                <View style={{alignItems:'center'}}>
                    <View style={{backgroundColor:colorStatus, width:150, height:35,borderTopRightRadius:15,borderTopLeftRadius:15,alignItems:'center'}}>
                        <Text style={styles.textStatus}>{ticket.status}</Text>
                    </View>
                    <View style={{borderColor:borderStatus,backgroundColor:'#FFFFFF', width:'90%',borderRadius:9,borderWidth:3,height:'auto', padding:7}}>
                        <View style={{height:'auto', flexDirection:'row'}}>
                            
                            <View style={{flex:1,height:200}}>
                                 {loadingImage && <Image source={require('../../assets/img/ImageFotoLoading.png')} style={{width:150, height:200}}/>}
                                <Image 
                                    source={{uri : Config.REACT_APP_BASE_URL + `${String(image[0]).replace('public/', '')}`}} 
                                    style={{flex:1}}
                                    onLoadEnd={() => setLoadingImage(false)}
                                    onLoadStart={() => setLoadingImage(true)}
                                    />
                            </View>
                            <View style={{paddingLeft:8,flex:1.2, height:'auto'}}>
                                <Text style={styles.title}>Tanggal : </Text>
                                <Text style={styles.data}>{ticket.created_at}</Text>
                                <Text style={styles.title}>Nama Pelanggan:</Text>
                                <Text style={styles.data}>{ticket.customer.namapelanggan}</Text>
                                <Text style={styles.title}>Ketegori :</Text>
                                <Text style={styles.data}>{ticket.category.name}</Text>
                                <Text style={styles.title}>Keterangan :</Text>
                                <Text style={styles.data}>{ticket.description}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:15}}>
                            <BtnDetail/>
                            <BtnAction/>
                            <BtnEdit/>
                            <BtnDelete/>
                        </View>
                    </View>
                </View>
                <Distance distanceV={5}/>
       </View>
    )
}
const styles = StyleSheet.create({
    textStatus:{
        color:'#FFFFFF', 
        fontSize:20, 
        alignItems:'center', 
        justifyContent:'center', 
        fontWeight:'bold',
        paddingTop:5
    },
    title:{
        fontSize:15, 
        fontWeight:'bold', 
        color:'#696969',
        paddingVertical:5
   },
    data:{
        color:'#696969'
   }
});
export {
    PageTicket
}