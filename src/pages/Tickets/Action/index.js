import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const Action=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Tindakan'/>
                        <Btn 
                            title='Tambah Tindakan' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddAction')}
                        />
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Departemen','Status','Aksi']}
                            tbdata={[
                                    ['1','Distribusi','Pending',''],
                                    ['2','Keuangan','Active',''],
                                    ]}
                            btn={[
                                    {name : 'View', color: colors.view, onPress : () => navigation.navigate('ViewAction')},
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditAction')},
                                    {name : 'Staff', color: colors.action, onPress : () => navigation.navigate('StaffAction')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteAction')}
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
export default Action
