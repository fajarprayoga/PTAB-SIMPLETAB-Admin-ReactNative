import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { useSelector } from 'react-redux';
import { BtnAdd,BtnDelete,BtnEdit, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { colors, Distance } from '../../../utils';



const Aksi =(props) => {
    return (
        <View style ={{alignItems : 'center', justifyContent :'center'}}>
            <View style={{flexDirection:'row'}}>
                <BtnEdit onPress={() => props.navigation.navigate('EditDepartemen', {dapertement : props.data})}/>
                <Distance distanceH={3}/>
                <BtnDelete onPress={props.delete}/>
            </View>
        </View>
    )
}


const Departemen=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    const [loading, setLoading] = useState(true)
    const tableHead = ['NO', 'Kode', 'Nama', 'Aksi'];
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tableNo, setTableNo] = useState()
    const [tableData, setTableData] = useState()
    const isFocused = useIsFocused();
    const [dapertement, setDapertement] = useState(null)
    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            dapertementAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    const dapertementAPi = () => {
        API.dapertements(TOKEN).then((result) => {
            let data = []
            let no = []
            result.data.map((item, index) => {
                // console.log(Object.keys(result.data[index]));
                no[index] = index + 1;
                data[index] = [
                    item.code,
                    item.name,
                    [<Aksi 
                            key ={index}
                            data={item} 
                            navigation={navigation} 
                            delete={() => handleDelete(item.id)}
                        />],
                ]
            })
            setDapertement(data)
            setTableData(data)
            setTableNo(no)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }

    const handleDelete =($id) => {
        setLoading(true)
        API.dapertementsDelete($id, TOKEN).then((result) => {
            // console.log(result);
            alert(result.data.message)
            dapertementAPi();
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
                        <Title title='Departemen'/>
                        <BtnAdd
                            title="Tambah Departemen"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={()=>navigation.navigate('AddDepartemen')}
                        />
                        <Distance distanceV={10}/>
                        {/* {dapertement &&   */}
                            {/* //  <View >
                            //     <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            //         <Row data={tableHead} flexArr={[1,2, 2, 2]} style={styles.head} textStyle={styles.text}/>
                            //     </Table> */}
             
                                 {/*  table data */}
                            {/* //     <ScrollView style={styles.dataWrapper}>
                            //         <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            //             <TableWrapper style={styles.wrapper}>
                            //                 <Col data={tableNo} style={styles.no} heightArr={[100,100]} textStyle={styles.text}/>
                            //                 <Rows data={tableData} flexArr={[2,2, 2]} style={styles.row} textStyle={styles.text}/>
                            //             </TableWrapper>
                            //         </Table>       
                            //     </ScrollView> */}
                            {/* // </View> */}
                        {/* } */}

                        <Distance distanceV={5}/>
                            <View style={{backgroundColor:'#FFFFFF', width:'100%',borderRadius:9,borderWidth:3,borderColor:'#CFEDFF',height:'auto', padding:7}}>
                                <View style={{height:'auto', flexDirection:'row'}}>
                                    <View style={{flex:1}}>
                                        <Text style={styles.title}>Kode</Text>
                                        <Text style={styles.title}>Nama Departemen</Text>
                                        <Text style={styles.title}>Deskripsi</Text>
                                    </View>
                                    <View style={{paddingLeft:8,flex:1.5, height:'auto'}}>
                                        <Text style={styles.data}>:23000</Text>
                                        <Text style={styles.data}>:Distribusi</Text>
                                        <Text style={styles.data}>:Bagian Distribusi</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:5}}>
                                    <BtnEdit/>
                                    <BtnDelete/>
                                </View>
                            </View>
                    </View>
                </View>
            {/* </ScrollView> */}
            <Footer navigation={navigation} focus='Menu'/>
       </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },  
    title:{
        fontSize:15, 
        fontWeight:'bold', 
        color:'#696969',
        paddingVertical:5
   },
    data:{
        color:'#696969',
        paddingVertical:5
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
    no: { flex: 1, backgroundColor: '#FFFFFF'  },
    row: {  height: 100  },
    text: { alignItems:'center', margin:6,paddingHorizontal:4 },
    dataWrapper: { marginTop: -1 },
})
export default Departemen
