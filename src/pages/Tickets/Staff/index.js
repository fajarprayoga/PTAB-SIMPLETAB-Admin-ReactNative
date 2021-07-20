import React, { useEffect, useState } from 'react'
import {View,ScrollView,StyleSheet, TouchableOpacity, Text} from 'react-native'
import {HeaderForm,Btn,Footer,Title, Spinner} from '../../../component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import API from '../../../service';
import { useSelector } from 'react-redux';
import { Col, Rows, TableWrapper, Table, Row } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';


const Aksi =(props) => {
    return (
        <View style ={{alignItems : 'center', justifyContent :'center'}}>
            <TouchableOpacity style ={[styles.btn, {backgroundColor : colors.edit}]} onPress={() => props.navigation.navigate('EditStaffAction', {action_staff : props.data, action : props.action})}>
                <Text style={{color : '#ffffff', fontWeight : 'bold'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style ={[styles.btn, {backgroundColor : colors.delete}]} onPress={props.delete}>
                <Text style={{color : '#ffffff', fontWeight : 'bold'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const Staff=({navigation, route})=>{
    const [loading, setLoading] = useState(true)
    const tableHead = ['NO', 'Departemen', 'Status', 'Aksi'];
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tableNo, setTableNo] = useState()
    const [tableData, setTableData] = useState()
    const isFocused = useIsFocused();
    const [staffs, setStaffs] = useState()


    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            actionStaffListsAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])


    const actionStaffListsAPi = () => {
        API.actionStaffs(route.params.action_id, TOKEN).then((result) => {
            let data = []
            let no = []
            result.data.staff.map((item, index) => {
                // console.log(Object.keys(result.data[index]));
                no[index] = index + 1;
                data[index] = [
                    item.name,
                    item.pivot.status,
                    [<Aksi 
                            key ={index}
                            data={item} 
                            action ={result.data}
                            navigation={navigation} 
                            delete={() => handleDelete(result.data.id, item.id)}
                        />],
                ]
            })
            console.log('success',result);
            setTableData(data)
            setTableNo(no)
            setStaffs(result.data)
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }

    const handleDelete =(action, staff) => {
        setLoading(true)
        API.actionStaffDestroy({action_id : action, staff_id : staff}, TOKEN).then((result) => {
            // console.log(result);
            alert(result.data.message)
            actionStaffListsAPi();
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            {/* <ScrollView> */}
                <HeaderForm/>
                <View style={{alignItems:'center', flex : 1}}>
                    <View style={{width:'90%'}}>
                        <Title title='Staff yang Bertugas'/>
                        <Btn 
                            title='Tambah Staff' 
                            width='60%'
                            icon={<FontAwesomeIcon icon={faPlusSquare} style={{color:'#FFFFFF'}} size={ 27 }/>}
                            onPress={()=>navigation.navigate('AddStaffAction', {action_id : route.params.action_id})}
                        />
                        <Distance distanceV={10}/>
                        {staffs &&  
                             <View style={{height : '65%'}} >
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={tableHead} flexArr={[1,2, 2, 2]} style={styles.head} textStyle={styles.text}/>
                                </Table>
             
                                {/*  table data */}
                                <ScrollView style={styles.dataWrapper}>
                                    <Table borderStyle={{borderWidth: 1}}>
                                        <TableWrapper style={styles.wrapper}>
                                            <Col data={tableNo} style={styles.no} heightArr={[120]} textStyle={styles.text}/>
                                            <Rows data={tableData} flexArr={[2,2, 2]} style={styles.row} textStyle={styles.text}/>
                                        </TableWrapper>
                                    </Table>       
                                </ScrollView>
                            </View>
                        }
                    </View>
                </View>
            {/* </ScrollView> */}
            <Footer navigation={navigation} focus='Home'/>
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
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row',},
    no: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 120  },
    text: { textAlign: 'center' },
    dataWrapper: { marginTop: -1 },
})
export default Staff
