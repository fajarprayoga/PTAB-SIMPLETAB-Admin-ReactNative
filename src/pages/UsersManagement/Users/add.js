import React,{useState} from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,Inpt,Dropdown} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';

const AddUsers =({navigation})=>{
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
                                    <Title title='Tambah Users' paddingVertical={5}/>
                                    <Txt title='Nama'/>
                                    <Inpt placeholder='Masukan Nama'/>
                                    <Txt title='Email'/>
                                    <Inpt placeholder='Masukan Email'/>
                                    <Txt title='Password'/>
                                    <Inpt placeholder='Masukan Password'/>
                                    <Txt title='Roles'/>
                                    <Dropdown
                                        placeholder='Pilih Roles'
                                        multiple={true}
                                        min={0}
                                        max={20}
                                        data={[
                                                {label: 'Admin', value: 'Admin'},
                                                {label: 'User', value: 'User'},
                                        ]}
                                    />
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={()=>navigation.navigate('Users')}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
                <Footer navigation={navigation} focus='Menu'/>
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

export default AddUsers