import React,{useState}from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table,Dropdown} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare, faSearch} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';

const Ticket=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Tiket'/>
                        <Btn 
                            title='Tambah Tiket' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddTicket')}
                        />
                        <Distance distanceV={10}/>
                        <View style={{flexDirection:'row'}}>
                            <Dropdown
                                placeholder='Pilih Status'
                                width='60%'
                                data={[
                                        {label: 'Semua Status', value: 'SemuaStatus'},
                                        {label: 'Pending', value: 'Pending'},
                                        {label: 'Active', value: 'Active'},
                                        {label: 'Close', value: 'Close'}
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
                            tbhead={['No','Nama','Status','Aksi']}
                            tbdata={[
                                    ['1','Tiket Gold','Pending',''],
                                    ['2','Tiket Platinum','Active',''],
                                    ]}
                            btn={[
                                    {name : 'View', color: colors.view,onPress:()=>navigation.navigate('ViewTicket')},
                                    {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditTicket')},
                                    {name : 'Tindakan', color: colors.action, onPress : () => navigation.navigate('Action')},
                                    {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteTicket')}
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
export default Ticket
