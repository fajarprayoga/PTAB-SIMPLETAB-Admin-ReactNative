import React, { useEffect, useState } from 'react'
import {View,ScrollView,StyleSheet, TouchableOpacity, Text} from 'react-native'
import {HeaderForm,Btn,Footer,Title,Table,Dropdown, Spinner} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare, faSearch} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';
import API from '../../../service';
import { useSelector } from 'react-redux';
import Button from '../../../component/Button';


const Aksi =(props) => {
    return (
        <View style ={{alignItems : 'center', justifyContent :'center'}}>
               <TouchableOpacity style ={[styles.btn, {backgroundColor : colors.view}]} onPress={() => props.navigation.navigate('ViewCustomer', {customer : props.data})} >
                    <Text style={{color : '#ffffff', fontWeight : 'bold'}}>View</Text>
               </TouchableOpacity>
               <TouchableOpacity style ={[styles.btn, {backgroundColor : colors.edit}]} onPress={() => props.navigation.navigate('EditCustomer', {customer : props.data})}>
                    <Text style={{color : '#ffffff', fontWeight : 'bold'}}>Edit</Text>
               </TouchableOpacity>
               <TouchableOpacity style ={[styles.btn, {backgroundColor : colors.delete}]} onPress={props.delete}>
                    <Text style={{color : '#ffffff', fontWeight : 'bold'}}>Delete</Text>
               </TouchableOpacity>
        </View>
    )
}

const Customer=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    const [loading, setLoading] = useState(true)
    const [customers, setCustomers]= useState(null)
    const TOKEN = useSelector((state) => state.TokenReducer);

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            // console.log(USER.id);
            customerAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [])

    const customerAPi = () => {
        API.customers(TOKEN).then((result) => {
            let data = []
            let no = 1
            result.data.map((item, index) => {
                // console.log(Object.keys(result.data[index]));
               data[index] = [
                   no++,
                   item.name,
                   item.type,
                   [<Aksi 
                        data={item} 
                        navigation={navigation} 
                        delete={() => handleDelete(item.id)}
                    />],
               ]
            })
            setCustomers(data)
            
            // console.log(data);
            // setTicket(data)
            // setTicket(result.data)
            setLoading(false)
            // console.log(result);
        }).catch((e) => {
            // console.log(e);
            setLoading(false)
        })
    }


    const handleDelete =($id) => {
        setLoading(true)
        API.customerDelete($id, TOKEN).then((result) => {
            console.log(result);
            customerAPi();
            alert(result.data.message)
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ScrollView>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Pelanggan'/>
                        <Btn 
                            title='Tambah Pelanggan' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddCustomer')}
                        />
                        <Distance distanceV={10}/>
                        <View style={{flexDirection:'row'}}>
                            <Dropdown
                                placeholder='Pilih Tipe'
                                width='60%'
                                data={[
                                        {label: 'Semua Tipe', value: 'SemuaTipe'},
                                        {label: 'Pelanggan', value: 'Pelanggan'},
                                        {label: 'Umum', value: 'Umum'}                
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
                       {customers &&  <Table
                            tbhead={['No','Nama','Tipe','Aksi']}
                            tbdata={customers}
                            // btn={[
                            //         {name : 'View', color: colors.view,onPress:()=>navigation.navigate('ViewCustomer')},
                            //         {name : 'Edit', color: colors.edit, onPress : () => navigation.navigate('EditCustomer')},
                            //         {name : 'Hapus', color: colors.delete, onPress : () => navigation.navigate('DeleteCustomer')}
                            //     ]}
                            cellindex={4}
                        />}
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
    btn : {
        width : 50,
        height : 30,
        marginVertical : 2, 
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,

    }
})
export default Customer
