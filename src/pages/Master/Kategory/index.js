import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table,Dropdown} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const Kategory=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Kategori'/>
                        <Btn 
                            title='Tambah Kategori' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddKategory')}
                        />
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Kode','Kategori','Aksi']}
                            tbdata={[
                                    ['1','CAT00001','Air Mati',''],
                                    ['2','CAT00002','Pipa Bocor',''],
                                    ['3','CAT00003','Tanah Jebol',''],
                                    ]}
                            btn={[
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditKategory')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteKategory')}
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
export default Kategory
