import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderMenu,Footer,TitleMenu,Menu} from '../../component'
import {IconPelanggan,IconKategori,IconDepartemen,IconStaff,IconSubDepartemen} from '../../assets/icon';
import { useSelector } from 'react-redux';

const Master=({navigation})=>{
    const Permission = useSelector((state) => state.PermissionReducer);
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderMenu/>
                <TitleMenu title='Master'/>
                    {Permission.includes('customer_access') &&
                        <Menu icon={<IconPelanggan/>} title='PELANGGAN' onPress={()=>navigation.navigate('Customer')}/>
                    }
                    {Permission.includes('categories_access') &&
                    <Menu icon={<IconKategori/>} title='KATEGORI' onPress={()=>navigation.navigate('Kategory')}/>
                    }
                    {Permission.includes('dapertement_access') &&
                    <Menu icon={<IconDepartemen/>} title='DEPARTEMEN' onPress={()=>navigation.navigate('Departemen')}/>
                    }
                    {Permission.includes('subdapertement_access') &&
                    <Menu icon={<IconSubDepartemen/>} title='SUB DEPARTEMEN' onPress={()=>navigation.navigate('SubDepartemen')}/>
                    }
                    {Permission.includes('staff_access') &&
                    <Menu icon={<IconStaff/>} title='STAFF' onPress={()=>navigation.navigate('Staff')}/>
                    }
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