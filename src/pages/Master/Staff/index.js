import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table,Dropdown} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const Staff=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Staff'/>
                        <Btn 
                            title='Tambah Staff' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddStaff')}
                        />
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Nama','Departemen','Aksi']}
                            tbdata={[
                                    ['1','STF00001','Distribusi',''],
                                    ['2','STF00002','Distribusi',''],
                                    ['3','STF00003','Keuangan',''],
                                    ]}
                            btn={[
                                    {name : 'View', color: colors.view, onPress : () => navigation.navigate('ViewStaff')},
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditStaff')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteStaff')}
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
export default Staff
