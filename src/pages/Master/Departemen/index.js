import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table,Dropdown} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const Departemen=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Departemen'/>
                        <Btn 
                            title='Tambah Departemen' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddDepartemen')}
                        />
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Kode','Departemen','Aksi']}
                            tbdata={[
                                    ['1','DAP00001','Distribusi',''],
                                    ['2','DAP00002','Keuangan',''],
                                    ['3','DAP00003','Informasi',''],
                                    ]}
                            btn={[
                                    {name : 'View', color: colors.view, onPress : () => navigation.navigate('ViewDepartemen')},
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditDepartemen')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteDepartemen')}
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
export default Departemen
