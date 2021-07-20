import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Footer, HeaderForm, Spinner, Title } from '../../../component';
import { colors, Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
import { Col, Rows, TableWrapper, Table, Row } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';


const Aksi =(props) => {
    const [block, setBlock] = useState(false) 
    useEffect(() => {
        props.action_staffs_list.map((list) => {
            if(list.staff_id == props.data.id){
                if(list.status == 'pending'){
                    setBlock(true)
                }
            }
        })

        props.action_staffs.staff.map((action_staff) => {
            if(action_staff.id == props.data.id){
                setBlock(true)
            }
        })
    }, [props.loading])

    
    return (
        <View style ={{alignItems : 'center', justifyContent :'center'}}>
            <TouchableOpacity  
                disabled={block}
                style ={[styles.btn, {backgroundColor : block ? 'grey' : colors.action}]} onPress={block ? null : props.onPress}>
                <Text style={{color : '#ffffff', fontWeight : 'bold'}}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}


const AddStaff=({navigation, route})=>{

    const [loading, setLoading] = useState(true)
    const tableHead = ['NO', 'Nama', 'No. Hp', 'Aksi'];
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
        API.actionStaffLists(route.params.action_id, TOKEN).then((result) => {
            let data = []
            let no = []
            result.data.staffs.map((item, index) => {
                // console.log(Object.keys(result.data[index]));
                no[index] = index + 1;
                data[index] = [
                    item.name,
                    item.phone,
                    [<Aksi 
                            action_staffs_list = {result.data.action_staff_lists}
                            action_staffs = {result.data.action_staffs}
                            key ={index}
                            data={item} 
                            loading = {loading}
                            navigation={navigation} 
                            action_id = {route.params.action_id}
                            delete={() => handleDelete(item.id)}
                            onPress={() => handleAction(item.id)}
                        />],
                ]
            })
            setTableData(data)
            setTableNo(no)
            setStaffs(result.data.staffs)

            console.log(result.data);
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }


    const handleAction =(staff_id) => {
        setLoading(true)
        API.actionsStaffStore({
            action_id : route.params.action_id,
            staff_id : staff_id
        }, TOKEN).then((result)=>{
            if(result.message.constructor === Array){
                alert( result.message.toString())
            }else{
                alert(result.message)
                navigation.navigate('StaffAction', {action_id : route.params.action_id})
            }
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }
    return(
        <View style={styles.container}>
                {loading && <Spinner/>}
                <HeaderForm/>
                <View style={{alignItems:'center', flex : 1}}>
                    <View style={{width:'90%'}}>
                        <Title title='Tambah Staff yang Betugas'/>
                        <Distance distanceV={10}/>
                        {staffs &&  
                             <View style={{height : '85%'}} >
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
        height : 30,
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
export default AddStaff
