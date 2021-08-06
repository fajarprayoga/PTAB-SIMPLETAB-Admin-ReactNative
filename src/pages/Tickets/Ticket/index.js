import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Btn, BtnAdd, BtnDelete,BtnAction, BtnDetail, BtnEdit, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { colors, Distance } from '../../../utils';

const Ticket=({navigation})=>{
    const [loading, setLoading] = useState(true)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [ticket, setTicket] = useState([]);
    const [page, setPage] = useState(1)
    const [cari, setCari] = useState()
    const [lastPage, setLastPage] = useState()
    const isFocused = useIsFocused();

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
            setTicket([])
        }
        
    },[isFocused,page])
   
    const getData = async () => {
        // alert('asasjasjn')
        // console.log(resetData);
        API.ticketList({'page' : page, status : cari},TOKEN).then((result) => {
            console.log('hasil',result)
            if(page > 1){
                setTicket(ticket.concat(result.data.data)) 
                // resetData = false
            }else{       
                setTicket(result.data.data)
                console.log('delete');
            }
            setLastPage(result.data.last_page)
            setLoading(false)
        }).catch(e =>{ 
            console.log(e.request)
            // setRefresh(false)
            setLoading(false)
        })
        // console.log(page);
    };

    const filter = () => {
        resetData = true
        getData();
        // alert('handle filter')
    }

    const handleDelete =($id, item) => {
        Alert.alert(
           'Peringatan',
           `Apakah anda yakin untuk menghapus ` +item.code+'?',
           [
               {
                   text : 'Tidak',
                   onPress : () => console.log('tidak')
               },
               {
                   text : 'Ya',
                   onPress : () => {
                       setLoading(true)
                       API.ticketsDelete($id, TOKEN).then((result) => {
                           resetData = true;
                           setPage(1)
                           getData();
                           alert(result.data.message)
                           setLoading(false)
                       }).catch((e) => {
                           console.log(e.request);
                           setLoading(false)
                       })
                   }
               }
           ]
         )
   }

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

  const renderItem = ({item}) => {
    return(
        <View style={styles.content}>
            <View style={styles.textnfo}>
               <TextInfo title = 'Tipe' item='haha'/>
               <TextInfo title = 'Tipe' item='haha'/>
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:15}}>
                <BtnDetail onPress={() => navigation.navigate('ViewCustomer', {customer : item})} />
                <BtnEdit onPress={() => navigation.navigate('EditCustomer', {customer : item})}/>
                <BtnDelete onPress={() => handleDelete(item.id, item)}/>
            </View>
        </View>
    )
}
    return (
        <SafeAreaView style={{flex : 1}}>
        {loading && <Spinner/>}
       <View style={styles.container}>
           
           {/* header */}
           <HeaderForm/>
           <View style={{paddingHorizontal : 20}}>
               <Title title='Daftar Pelanggan'/>
               <BtnAdd
                   title="Tambah Pelanggan"
                   width='60%'
                   icon={faPlusCircle}
                   onPress={()=>navigation.navigate('AddCustomer')}
               />        
               <Distance distanceV={10}/>
               <View style={{flexDirection:'row'}}>
                   <TextInput style={styles.search} value={cari} onChangeText={(item) => setFind(item)} ></TextInput>
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
               data={ticket}
               ItemSeparatorComponent={ItemSeparatorView}
               contentContainerStyle={{alignItems : 'center'}}
               renderItem={renderItem}
               ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
               onEndReached={handleLoadMore}
               onEndReachedThreshold={0}
               // onRefresh={onRefresh}
               // refreshing={refresh}
           />
       </View>
       <Footer navigation={navigation} focus='Menu'/>
  </SafeAreaView>
    )
}
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
export default Ticket