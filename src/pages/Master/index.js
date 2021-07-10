import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderMenu,Footer,TitleMenu,Menu} from '../../component'
import {IconPelanggan,IconKategori,IconDepartemen,IconStaff} from '../../assets/icon';

const Master=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderMenu/>
                <TitleMenu title='Master'/>
                    <Menu icon={<IconPelanggan/>} title='PELANGGAN' onPress={()=>navigation.navigate('Customer')}/>
                    <Menu icon={<IconKategori/>} title='KATEGORI' onPress={()=>navigation.navigate('Kategory')}/>
                    <Menu icon={<IconDepartemen/>} title='DEPARTEMEN' onPress={()=>navigation.navigate('Departemen')}/>
                    <Menu icon={<IconStaff/>} title='STAFF' onPress={()=>navigation.navigate('Staff')}/>
            </ScrollView>
            <Footer navigation={navigation} focus='Menu' />
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
})
export default Master