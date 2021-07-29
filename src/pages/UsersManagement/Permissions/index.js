import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,BtnAdd,Footer,Title,Table,Dropdown} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const Permissions=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Permissions'/>
                        <BtnAdd
                            title="Tambah Permissions"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={()=>navigation.navigate('AddPermissions')}
                        />
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Title','Aksi']}
                            tbdata={[
                                    ['1','user_management_access',''],
                                    ['2','permission_create',''],
                                    ['3','permission_show',''],
                                    ]}
                            btn={[
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditPermissions')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeletePermissions')}
                                ]}
                            cellindex={2}
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
export default Permissions
