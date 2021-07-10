import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table} from '../../../component';
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
                        <Title title='Staff yang Bertugas'/>
                        <Btn 
                            title='Tambah Staff' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddStaffAction')}
                        />
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Staff','Status','Aksi']}
                            tbdata={[
                                    ['1','Staff Distribusi 02','Pending',''],
                                    ['2','Staff Distribusi 01','Active',''],
                                    ]}
                            btn={[
                                    {name : 'View', color: colors.view, onPress : () => navigation.navigate('ViewStaffAction')},
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditStaffAction')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteStaffAction')}
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
export default Staff
