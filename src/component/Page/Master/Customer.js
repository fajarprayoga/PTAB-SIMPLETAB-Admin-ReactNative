import React,{useState} from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import Config from 'react-native-config';
import { BtnDelete,BtnAction,BtnDetail,BtnEdit } from '../../index';
import Distance from '../../../utils/distance'

const PageCustomer=(props)=>{
    const customers = props.data;

    return(
        <View>
           <Distance distanceV={5}/>
                <View style={{alignItems:'center'}}>
                    <View style={{borderColor:'blue',backgroundColor:'#FFFFFF', width:'90%',borderRadius:9,borderWidth:3,height:'auto', padding:7}}>
                        <View style={{height:'auto', flexDirection:'row'}}>
                            
                            <View style={{flex:1,height:200}}>
                            </View>
                            <View style={{paddingLeft:8,flex:1.2, height:'auto'}}>
                                <Text style={styles.title}>Tanggal : </Text>
                                <Text style={styles.data}>tanggal</Text>
                                <Text style={styles.title}>Nama Pelanggan:</Text>
                                <Text style={styles.data}>nama</Text>
                                <Text style={styles.title}>Ketegori :</Text>
                                <Text style={styles.data}>kategori</Text>
                               
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
export{ 
    PageCustomer
}