import React from 'react'
import {Text,View,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import { Header,Footer,Txt,Inpt,Btn } from '../../component'
import { IconLogout } from '../../assets/icon'
import { Distance } from '../../utils'
import { useSelector } from 'react-redux'

const Profile =({navigation})=>{

    const USER = useSelector((state) => state.UserReducer);
    
    return(
        <View style={styles.container}>
            <ScrollView>
                <Header text='Profile'/>
                <TouchableOpacity style={{position:'absolute',}} onPress={()=>navigation.navigate('Menu')}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end', width:'98%',paddingTop:10}}>
                       <IconLogout/>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:50, position:'absolute', top:104}}>
                    <View style={{backgroundColor:'#FFFFFF', width:'70%', height:50,borderTopLeftRadius:60, alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18, color:"#000000", fontWeight:'bold'}}>{USER.name}</Text>
                    </View>
                </View>
                <Distance distanceV={25}/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Txt title='Email '/>
                        <Inpt  value={USER.email} editable={false} borderWidth={0}/>
                        {/* <Txt title='Alamat'/>
                        <Inpt value={USER.address} editable={false} borderWidth={0}/>
                        <Txt title='No Handphone'/>
                        <Inpt placeholder='Masukan No Handphone' value='0891237788' borderWidth={0}/> */}
                        <Distance distanceV={10}/>
                        <View style={{alignItems:'center'}}>
                            <Btn title='Simpan' onPress={()=>console.log(USER)}/>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
            <Footer navigation={navigation} focus='Profile'/>
        </View>
    )
}
const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#FFFFFF'
    }
})
export default Profile