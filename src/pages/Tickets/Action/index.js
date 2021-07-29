import React, { useEffect, useState } from 'react'
import {View,ScrollView,StyleSheet, TouchableOpacity, Text} from 'react-native'
import {HeaderForm,BtnAdd,BtnStaff,BtnEdit,BtnDelete,BtnDetail,Footer,Title, Spinner} from '../../../component';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import API from '../../../service';
import { useSelector } from 'react-redux';
import { Col, Rows, TableWrapper, Table, Row } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';

const Aksi =(props) => {
    return (
        <View style ={{alignItems : 'center', justifyContent :'center'}}>
             <View style={{flexDirection:'row'}}>
                <BtnStaff onPress={() => props.navigation.navigate('StaffAction', {action_id : props.data.id})}/>
                <Distance distanceH={3}/>
                <BtnDetail onPress={() => props.navigation.navigate('ViewAction', {action : props.data})}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <BtnEdit onPress={() => props.navigation.navigate('EditAction', {action : props.data})}/>
                <Distance distanceH={3}/>
                <BtnDelete onPress={props.delete}/>
            </View>
        </View>
    )
}

const Action=({navigation, route})=>{
    const [loading, setLoading] = useState(true)
    const tableHead = ['NO', 'Nama', 'Status', 'Aksi'];
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tableNo, setTableNo] = useState()
    const [tableData, setTableData] = useState()
    const isFocused = useIsFocused();
    const [actions, setActions] = useState()

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            actionsAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    const actionsAPi = () => {
        API.actions(route.params.ticket_id, TOKEN).then((result) => {
            let data = []
            let no = []
            result.data.map((item, index) => {
                // console.log(Object.keys(result.data[index]));
                no[index] = index + 1;
                data[index] = [
                    item.dapertement.name,
                    item.status,
                    [<Aksi 
                            key ={index}
                            data={item} 
                            navigation={navigation} 
                            delete={() => handleDelete(item.id)}
                        />],
                ]
            })
            setActions( result.data)
            setTableData(data)
            setTableNo(no)
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }


    const handleDelete =($id) => {
        setLoading(true)
        API.actionsDelete($id, TOKEN).then((result) => {
            // console.log(result);
            alert(result.data.message)
            ticketsAPi();
            // setLoading(false)
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
                        <Title title='Tindakan'/>
                        <BtnAdd
                            title="Tambah Tindakan"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={()=>navigation.navigate('AddAction', {ticket_id : route.params.ticket_id})}
                        />
                       
                        <Distance distanceV={10}/>
                        {actions &&  
                             <View style={{height : '65%'}} >
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={tableHead} flexArr={[1,2, 2, 2]} style={styles.head} textStyle={styles.text}/>
                                </Table>
             
                                {/*  table data */}
                                <ScrollView style={styles.dataWrapper}>
                                    <Table borderStyle={{borderWidth: 1,borderColor: '#E5E7E9'}}>
                                        <TableWrapper style={styles.wrapper}>
                                            <Col data={tableNo} style={styles.no} heightArr={[100]} textStyle={styles.text}/>
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
    head: {  height: 50,  backgroundColor: '#EAF4FA'  },
    wrapper: { flexDirection: 'row',},
    no: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 100  },
    text: {  alignItems:'center', margin:6,paddingHorizontal:4 },
    dataWrapper: { marginTop: -1 },
})
export default Action
