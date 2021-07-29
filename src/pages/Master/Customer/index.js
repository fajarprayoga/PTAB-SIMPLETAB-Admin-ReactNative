import React, { useEffect, useState } from 'react'
import {View,ScrollView,StyleSheet, TouchableOpacity, Text} from 'react-native'
import {HeaderForm,Btn,BtnAdd,BtnDetail,BtnEdit,BtnDelete,Footer,Title,Dropdown, Spinner} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import DropDownPicker from 'react-native-dropdown-picker';
import API from '../../../service';
import { useSelector } from 'react-redux';
import { Col, Rows, TableWrapper, Table, Row } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';

// ...


const Aksi =(props) => {
    return (
        <View style ={{alignItems : 'center', justifyContent :'center'}}>
            {/* <TouchableOpacity style ={[styles.btn, {backgroundColor : colors.view}]} onPress={() => props.navigation.navigate('ViewCustomer', {customer : props.data})} >
                <Text style={{color : '#ffffff', fontWeight : 'bold'}}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style ={[styles.btn, {backgroundColor : colors.edit}]} onPress={() => props.navigation.navigate('EditCustomer', {customer : props.data})}>
                <Text style={{color : '#ffffff', fontWeight : 'bold'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style ={[styles.btn, {backgroundColor : colors.delete}]} onPress={props.delete}>
                <Text style={{color : '#ffffff', fontWeight : 'bold'}}>Delete</Text>
            </TouchableOpacity> */}

            <View style={{flexDirection:'row'}}>
                <BtnDetail  onPress={() => props.navigation.navigate('ViewCustomer', {customer : props.data})} />
                <Distance distanceH={3}/>
                <BtnEdit  onPress={() => props.navigation.navigate('EditCustomer', {customer : props.data})}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <BtnDelete onPress={props.delete}/>
            </View>
        </View>
    )
}

const Customer=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    const [loading, setLoading] = useState(true)
    const [customers, setCustomers]= useState(null)
    const [baseData, setBaseData]= useState(null)
    const [customersLength, setCustomersLength]= useState(null)
    const tableHead = ['NO', 'Nama', 'Type', 'Aksi'];
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tableNo, setTableNo] = useState()
    const [tableData, setTableData] = useState()
    const [type, setType] = useState(null)
    const isFocused = useIsFocused();
    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            customerAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    const customerAPi = () => {
        API.customers(TOKEN).then((result) => {
            let data = []
            let no = []
            result.data.map((item, index) => {
                // console.log(Object.keys(result.data[index]));
                no[index] = index + 1;
               data[index] = [
                   item.name,
                   item.type,
                   [<Aksi 
                        key ={index}
                        data={item} 
                        navigation={navigation} 
                        delete={() => handleDelete(item.id)}
                    />],
               ]
            })
            setCustomers(data)
            setCustomersLength(no)
            setTableData(data)
            setTableNo(no)
            // console.log(data);
            setBaseData(result.data)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }

    const filter = () => {
        let data = []
        let no = []
        setLoading(true)
        if(type !== null){
            baseData.map((item,index) => {
               if(item.type == type){
                    no[index] = index + 1;
                    data[index] = [
                        item.name,
                        item.type,
                        [<Aksi 
                             data={item} 
                             navigation={navigation} 
                             delete={() => handleDelete(item.id)}
                         />],
                    ]
               }
            })
            setTableNo(no)
            setTableData(data)
            // console.log('dat data ',data);
            setLoading(false)
        }else{
            setTableNo(customersLength)
            setTableData(customers)
            setLoading(false)
        }
        console.log(customersLength);
    }


    const handleDelete =($id) => {
        setLoading(true)
        API.customerDelete($id, TOKEN).then((result) => {
            // console.log(result);
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
            <View style={{flex : 1}}>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Pelanggan'/>
                        <BtnAdd
                            title="Tambah Pelanggan"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={()=>navigation.navigate('AddCustomer')}
                        />
                        <Distance distanceV={10}/>
                        <View style={{flexDirection:'row'}}>
                            <Dropdown
                                placeholder='Pilih Tipe'
                                width='60%'
                                data={[
                                        {label: 'Semua Tipe', value: null},
                                        {label: 'Pelanggan', value: 'customer'},
                                        {label: 'Umum', value: 'public'}                
                                    ]}
                                onChangeValue = {(item) => setType(item)}
                                zIndex = {1}
                            />
                            <Distance distanceH={5}/>
                            <Btn 
                                title='Filter' 
                                width='35%'
                                icon={<FontAwesomeIcon icon={faSearch} style={{color:'#FFFFFF'}} size={ 27 }/>} 
                                onPress={filter}
                            />
                        </View>
                        <Distance distanceV={10}/>
                        {customers &&  
                             <View style={{height : '63%'}}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={tableHead} flexArr={[1,2, 2, 2]} style={styles.head} textStyle={styles.text}/>
                                </Table>
             
                                {/*  table data */}
                                <ScrollView style={styles.dataWrapper}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        <TableWrapper style={styles.wrapper}>
                                            <Col data={tableNo} style={styles.no} heightArr={[100,100]} textStyle={styles.text}/>
                                            <Rows data={tableData} flexArr={[2,2, 2]} style={styles.row} textStyle={styles.text}/>
                                        </TableWrapper>
                                    </Table>       
                                </ScrollView>
                            </View>
                        }
                    </View>
                </View>
            </View>
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
        height : 20,
        marginVertical : 2, 
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,

    },
    head: {  height: 50,  backgroundColor:'#EAF4FA'  },
    wrapper: { flexDirection: 'row',},
    no: { flex: 1,  backgroundColor: '#FFFFFF' },
    row: {  height: 100  },
    text: {  alignItems:'center', margin:6,paddingHorizontal:4 },
    dataWrapper: { marginTop: -1 },
})
export default Customer
