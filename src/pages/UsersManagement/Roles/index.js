import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,BtnAdd,Footer,Title,Table,Dropdown} from '../../../component';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const Roles =({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Roles'/>
                        <BtnAdd
                            title="Tambah Roles"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={()=>navigation.navigate('AddRoles')}
                        />
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Title','Permissions']}
                            tbdata={[
                                    ['1','Admin',''],
                                    ['2','Users',''],
                                    ['3','Admin',''],
                                    ]}
                            btn={[
                                    {name : 'View', color: colors.view, onPress : () => navigation.navigate('ViewRoles')},
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditRoles')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteRoles')}
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
export default Roles
