import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { useSelector } from 'react-redux';
import { BtnAdd, BtnDelete, BtnEdit, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { Distance } from '../../../utils';


const Aksi =(props) => {
    return (
        <View style ={{alignItems : 'center', justifyContent :'center'}}>
            <View style={{flexDirection:'row'}}>
                <BtnEdit onPress={() => props.navigation.navigate('EditKategory', {category : props.data})}/>
                <Distance distanceH={3}/>
                <BtnDelete onPress={props.delete}/>
            </View>
        </View>
    )
}


const Kategory=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    const tableHead = ['NO', 'Kode', 'Nama', 'Aksi'];
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [categories, setCategories]= useState(null)
    const [tableNo, setTableNo] = useState()
    const [tableData, setTableData] = useState()
    const isFocused = useIsFocused();
    useEffect(() => {
       let isAmounted = true 
       if(isAmounted){
            categoryAPI()
       }

       return () => {
           isAmounted = false
       }
    }, [isFocused])

    const categoryAPI = () => {
        API.categories(TOKEN).then((result) => {
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
            setCategories(data)     
            setTableData(data)
            setTableNo(no)
            setLoading(false)
        }).catch((e) => {
            console.log(e);
            setLoading(false)
        })
    }

    const handleDelete =($id) => {
        setLoading(true)
        API.categoriesDelete($id, TOKEN).then((result) => {
            // console.log(result);
            alert(result.data.message)
            categoryAPI();
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
                        <Title title='Kategori'/>
                        <BtnAdd
                            title="Tambah Kategori"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={()=>navigation.navigate('AddKategory')}
                        />
                        <Distance distanceV={10}/>
                        {categories &&  
                             <View >
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
    head: {   height: 50,  backgroundColor:'#EAF4FA'  },
    wrapper: { flexDirection: 'row',},
    no: { flex: 1, backgroundColor: '#FFFFFF' },
    row: {   height: 100  },
    text: {  alignItems:'center', margin:6,paddingHorizontal:4},
    dataWrapper: { marginTop: -1 },
})
export default Kategory
