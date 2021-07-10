import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table,Dropdown} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare, faSearch} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const Customer=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Pelanggan'/>
                        <Btn 
                            title='Tambah Pelanggan' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddCustomer')}
                        />
                        <Distance distanceV={10}/>
                        <View style={{flexDirection:'row'}}>
                            <Dropdown
                                placeholder='Pilih Tipe'
                                width='60%'
                                data={[
                                        {label: 'Semua Tipe', value: 'SemuaTipe'},
                                        {label: 'Pelanggan', value: 'Pelanggan'},
                                        {label: 'Umum', value: 'Umum'}                
                                    ]}
                            />
                            <Distance distanceH={5}/>
                            <Btn 
                                title='Filter' 
                                width='35%'
                                icon={<FontAwesomeIcon icon={faSearch} style={{color:'#FFFFFF'}} size={ 27 }/>} 
                            />
                        </View>
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Nama','Tipe','Aksi']}
                            tbdata={[
                                    ['1','Pelanggan 01','Pelanggan',''],
                                    ['2','Pelanggan 02','Umum',''],
                                    ['3','Pelanggan 03','Umum',''],
                                    ]}
                            btn={[
                                    {name : 'View', color: colors.view,onPress:()=>navigation.navigate('ViewCustomer')},
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditCustomer')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteCustomer')}
                                ]}
                            cellindex={3}
                        />
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} focus='Menu'/>
       </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
})
export default Customer
