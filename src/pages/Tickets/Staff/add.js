import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const AddStaff=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Tambah Staff yang Betugas'/>
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['Kode','Nama Staff','No Ponsel','Aksi']}
                            tbdata={[
                                    ['1','Staff Distribusi 02','0853627123',''],
                                    ['2','Staff Distribusi 01','0891231247',''],
                                    ]}
                            btn={[
                                    {name : 'Tambah', color: colors.edit, onPress : () => navigation.navigate('StaffAction')},
                                ]}
                            cellindex={3}
                        />
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} focus='Home'/>
       </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
})
export default AddStaff
