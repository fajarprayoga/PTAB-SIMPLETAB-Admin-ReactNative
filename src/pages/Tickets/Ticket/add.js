import React from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Inpt,Btn,TxtArea,Dropdown,Searchable} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import {Distance} from'../../../utils';

const AddTicket =({navigation})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <HeaderInput/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <Title title='Tambah Tiket' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode'/>
                                    <Txt title='Nama Tiket'/>
                                    <Inpt placeholder='Masukan Nama Tiket'/>
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Masukan Deskripsi'/>
                                    <Txt title='Bukti Gambar'/>
                                    <Txt title='Bukti Video'/>
                                    <Txt title='Status'/>
                                    <Dropdown 
                                        placeholder='Pilih Status'
                                        zIndex={1001}
                                        data={[
                                                {label: 'Pending', value: 'Pending'},
                                                {label: 'Active', value: 'Active'},
                                                {label: 'Close', value: 'Close'}
                                        ]}
                                    />
                                    <Txt title='Kategori'/>
                                        <Searchable
                                            placeholder="Pilih Kategori"
                                            data={[
                                                {id:1,name:'1'},
                                                {id:2,name:'2'},
                                                {id:3,name:'3'},
                                                {id:4,name:'4'}
                                            ]}
                                        />
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={()=>navigation.navigate('Ticket')}/>
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