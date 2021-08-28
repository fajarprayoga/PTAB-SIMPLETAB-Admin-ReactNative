import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Btn, BtnAdd, BtnDelete,BtnAction, BtnDetail, BtnEdit, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { colors, Distance } from '../../../utils';


const TextInfo = (props) => {
    return (
    <View style={{paddingVertical:5}}>
        <View style={{flexDirection:'row',height:'auto'}}>
            <View style={{flex:1, }}>
                <Text style={styles.textTiltle}>{props.title}</Text>
            </View>
            <View style={{flex:0.1}}>
                <Text style={styles.textTiltle}>:</Text>
            </View>
            <View style={{flex:1.5,flexDirection:'row'}}>
                <Text style={styles.textItem}>{props.item}</Text>
            </View>
        </View>
    </View>
    )
}

const SelectCustomer = ({navigation, route}) => {
    const [loading, setLoading] = useState(true)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [dataCustomers, setDataCustomers] = useState([]);
    const [page, setPage] = useState(1)
    const [find, setFind] = useState()
    const [lastPage, setLastPage] = useState()
    const isFocused = useIsFocused();
    const Permission = useSelector((state) => state.PermissionReducer);
    const [refresh, setRefresh] = useState(false)
    const [form, setForm] = useState({
        title :'',
        category_id : '',
        description :  '',
        lat : '',
        lng :   '',
        customer_id :   '',
        dapertement_id :'',
    })
    var resetData = false;

    const handleLoadMore = () => {
        if(page < lastPage){
            setPage(page + 1);
        }
    }

    useEffect(() => {
        if(isFocused){
            setLoading(true)
            getData()
        }else{
            setPage(1)
            setDataCustomers([])
        }
        
    },[isFocused,page])

    
    const getData = async () => {
        // alert('asasjasjn')
        // console.log(resetData);
        API.customerList({'page' : page, search : find},TOKEN).then((result) => {
            console.log(result)
            if(page > 1){
                setDataCustomers(dataCustomers.concat(result.data.data)) 
                // resetData = false
            }else{       
                setDataCustomers(result.data.data)
                console.log('delete');
            }
            setLastPage(result.data.last_page)
            setLoading(false)
            setRefresh(false)
        }).catch(e =>{ 
            console.log(e.request)
            // setRefresh(false)
            setRefresh(false)
            setLoading(false)
        })
       

        // console.log(page);
    };
    const onRefresh = () => {
        setRefresh(true)
    }
    useEffect(() => {
        getData()
      }, [refresh])
    const filter = () => {
        setLoading(true)
        resetData = true
        getData();
        // alert('handle filter')
    }

    useEffect(() => {
        if(form.customer_id!=null && form.customer_id!=''){
            navigation.navigate('AddTicket', {ticket : form})
        }
    }, [form])

    // batas peritem

   const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          marginVertical : 10
        }}
      />
    );
  };

    //   content
    const renderItem = ({item}) => {
        return(
            <View style={styles.content}>
                <View style={styles.textnfo}>
                   <TextInfo title = 'Tipe' item={item.type == 'Public' ? 'umum' : 'Pelanggan'}/>
                   <TextInfo title = 'Nama Pelanggan' item={item.namapelanggan} />
                   <TextInfo title = 'Alamat' item={item.alamat} />
                   <TextInfo title = 'Telepon' item={item.phone} />
                </View>
                <View style={{backgroundColor:'#f4f4f4', width:'100%', height:2}}></View>
                <View style={{padding:10, alignItems:'center', justifyContent : 'center'}}>
                    <Btn 
                        title='Pilih' 
                        width='100%'
                        height ={40}
                        // icon={<FontAwesomeIcon icon={faSearch} style={{color:'#FFFFFF'}} size={ 27 }/>} 
                        // onPress={() => navigation.navigate('AddTicket', {ticket : form})}
                        onPress={() => {setForm({
                            ...route.params.ticket,
                            customer_id : item.id,
                            customer_name : item.name 
                        });}}
                    />
                </View>
            </View>
        )
    }

    // base
    return (
       <SafeAreaView style={{flex : 1}}>
             {loading && <Spinner/>}
            <View style={styles.container}>
                
                {/* header */}
                <HeaderForm/>
                <View style={{paddingHorizontal : 20}}>
                    <Title title='Pilih Pelanggan'/>      
                    <Distance distanceV={10}/>
                    <View style={{flexDirection:'row'}}>
                        <TextInput style={styles.search} value={find} onChangeText={(item) => setFind(item)} ></TextInput>
                        <Distance distanceH={5}/>
                        <Btn 
                            title='Filter' 
                            width='35%'
                            icon={<FontAwesomeIcon icon={faSearch} style={{color:'#FFFFFF'}} size={ 27 }/>} 
                            onPress={() => {setPage(1); filter()}}
                        />
                    </View>    
                    <Distance distanceV={10}/>        
                </View>
                {/*batas headxer  */}

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={dataCustomers}
                    ItemSeparatorComponent={ItemSeparatorView}
                    contentContainerStyle={{alignItems : 'center'}}
                    renderItem={renderItem}
                    ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0}
                    onRefresh={onRefresh}
                    refreshing={refresh}
                />
            </View>
            {/* <Footer navigation={navigation} focus='Menu'/> */}
       </SafeAreaView>
    )
}

export default SelectCustomer

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor:'#ffffff'
    },
    content : {
        borderWidth : 3,
        borderColor: '#CFEDFF',
        width : Dimensions.get('screen').width - 45,
        borderRadius : 10
        // marginVertical : 20
    },
    search : {
        backgroundColor:'#ffffff',
        width : '60%',
        borderRadius : 4,
        borderWidth : 1,
        borderColor : colors.border,
        paddingHorizontal:20
    },
    textnfo : {
        paddingHorizontal : 10,
        paddingVertical : 10,
        
    },
    textTiltle : {
        fontWeight : 'bold',
        fontSize : 15,
        color:'#696969'
    },
    textItem : {
        fontSize : 15,
        color:'#696969'
    }
})