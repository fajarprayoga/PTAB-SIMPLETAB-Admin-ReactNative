import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table,Dropdown} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
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
                        <Title title='Users'/>
                        <Btn 
                            title='Tambah Users' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddUsers')}
                        />
                        <Distance distanceV={10}/>
                        <Table
                            tbhead={['No','Email','Roles']}
                            tbdata={[
                                    ['1','putualgoritma@gmail.com',''],
                                    ['2','putualgoritma@gmail.com',''],
                                    ['3','putualgoritma@gmail.com',''],
                                    ]}
                            btn={[
                                    {name : 'View', color: colors.view, onPress : () => navigation.navigate('ViewUsers')},
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditUsers')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteUsers')}
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
