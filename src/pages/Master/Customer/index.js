import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Btn, BtnAdd, BtnDelete, BtnDetail, BtnEdit, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { colors, Distance } from '../../../utils';

const TextInfo = (props) => {
    return (
        <>
            <Text style={styles.textTiltle}>{props.title}</Text>
            <Text style={styles.textItem}>{props.item}</Text>
        </>
    )
}

const Customer = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [dataCustomers, setDataCustomers] = useState([]);
    const [offset, setOffset] = useState({
        search : '',
        start : 0,
        end:10,
    });

    useEffect(() => {
       getData()
    }, [])

    const filter = () => {
        getData()
    }

    const getData = () => {
        console.log('getData');
        setLoading(true);
    
        API.customerList(offset,TOKEN).then((result) => {
            // console.log(result)
            setOffset({
                ...offset,
                start : offset.end,
                end : offset.end + 10,
            })
            console.log(result);
            // setDataCustomers(result.data)
            result.data.map((item, index) => {
                dataCustomers.push(item)
            })
            // setDataCustomers(dataCustomers.concat(result.data)) 
            setLoading(false)
        }).catch(e =>{ 
            console.log(e.request)
            setLoading(false)
        })
    };


    const handleDelete =($id) => {
        setLoading(true)
        API.customerDelete($id, TOKEN).then((result) => {
            console.log('delete',result);
            getData();
            alert(result.data.message)
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }



        // Headeer
    const Header = () => {
        return (
            <View >
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
                        <TextInput style={styles.search} placeholder ='Nama Pelanggan' onChangeText={(item) => setOffset({...offset, search : item})} value={offset.search} />
                        <Distance distanceH={5}/>
                        <Btn 
                            title='Filter' 
                            width='35%'
                            icon={<FontAwesomeIcon icon={faSearch} style={{color:'#FFFFFF'}} size={ 27 }/>} 
                            onPress={filter}
                        />
                    </View>    
                    <Distance distanceV={10}/>        
                </View>
            </View>
        )
    }



    // Footer
    const FooterFlat = () => {
        return (
            <Footer navigation={navigation} focus='Menu'/>
        )
    }

    // batas peritem
    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: 'red',
              marginVertical : 20
            }}
          />
        );
      };


    //   content
    const renderItem = ({item}) => {
        return(
            <View style={styles.content}>
                <View style={styles.textnfo}>
                   <TextInfo title = 'Nama Pelanggan' item={item.namapelanggan} />
                   <TextInfo title = 'Alamat' item={item.alamat} />
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:15}}>
                    <BtnDetail onPress={() => navigation.navigate('ViewCustomer', {customer : item})} />
                    {/* <BtnAction/> */}
                    <BtnEdit onPress={() => navigation.navigate('EditCustomer', {customer : item})}/>
                    <BtnDelete onPress={() => handleDelete(item.id)}/>
                </View>
            </View>
        )
    }

    // base
    return (
       <SafeAreaView style={{flex : 1}}>
             {loading && <Spinner/>}
            <View style={styles.container}>
                <Header/>
                <FlatList
                    // scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={dataCustomers}
                    ItemSeparatorComponent={ItemSeparatorView}
                    // ListHeaderComponent={Header}
                    contentContainerStyle={{alignItems : 'center'}}
                    renderItem={renderItem}
                    ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
                    onEndReached={getData}
                    onEndReachedThreshold={0.1}
                />
            </View>
            <FooterFlat/> 
       </SafeAreaView>
    )
}

export default Customer

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor:'#ffffff'
    },
    content : {
        borderWidth : 1,
        borderColor:'blue',
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
        paddingVertical : 10
    },
    textTiltle : {
        fontWeight : 'bold',
        fontSize : 15
    }
})
