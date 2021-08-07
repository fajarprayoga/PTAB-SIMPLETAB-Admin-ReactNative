import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { Btn, BtnAction, BtnAdd, BtnDelete, BtnDetail, BtnEdit, Dropdown, Footer, HeaderForm, Spinner, Title } from '../../../component';
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


const Ticket = ({navigation}) => {
    const [loading, setLoading] = useState(true)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [dataTickets, setDataTickets] = useState([]);
    const [success, setSuccess] = useState(true);
    const [loadingImage, setLoadingImage] = useState(true)
    const [offset, setOffset] = useState({
        status : '',
        start : 0,
        end:10,
    });

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        console.log('hasil success',success);
        // if(success != false){
            setLoading(true);
    
            API.ticketList(offset,TOKEN).then((result) => {
                // console.log(result)
                setOffset({
                    ...offset,
                    start : offset.end,
                    end : offset.end + 10,
                }) 
                setSuccess(result.success)
                // const image = JSON.parse(props.data.ticket_image[0].image);
                result.data.map((item, index) => {
                    dataTickets.push(item)
                    // setDataTickets([])
                })
                // setDataTickets(result.data)     
                setLoading(false)
            }).catch(e =>{ 
                console.log(e.request)
                setLoading(false)
            })
        // }
    };

    const filter = () => {
        console.log(offset);
    }

    // heaeder

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
                        // onPress={()=>navigation.navigate('AddCustomer')}
                        onPress={() => console.log(dataTickets )}
                    />        
                    <Distance distanceV={10}/>
                    <View style={{flexDirection:'row'}}>
                        <Dropdown
                            onChangeValue={item => alert(item)}
                            value = 'active'
                            placeholder='Pilih Tipe'
                            width='60%'
                            data={[
                                    {label: 'Semua Tipe', value: ''},
                                    {label: 'Pending', value: 'pending'},
                                    {label: 'Active', value: 'active'},
                                    {label: 'Close', value: 'close'}                
                                ]}
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
                </View>
            </View>
        )
    }

    // dlete

    const handleDelete =($id) => {
        // setLoading(true)
        API.ticketsDelete($id, TOKEN).then((result) => {
            // console.log(result);
            alert(result.data.message)
            // navigation.navigate('Ticket')
            setSuccess(true)
            // getData();
            setLoading(false)
            console.log(result);
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }


    //batas peritem
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
        if(item.status == 'active'){
            var colorStatus = '#7DE74B';
            var borderStatus = '#CAFEC0'
            
        }else if(item.status == 'pending'){
            var colorStatus = '#F0D63C';
            var borderStatus = '#FFF6C2'
        }else{
            var colorStatus = '#2392D7';
            var borderStatus ='#CFEDFF'
        }
        return(
            <View style={{alignItems:'center'}}>
                <View style={{backgroundColor:colorStatus, width:150, height:35,borderTopRightRadius:15,borderTopLeftRadius:15,alignItems:'center'}}>
                    <Text style={styles.textStatus}>{item.status}</Text>
                </View>
                <View style={{borderColor:borderStatus,backgroundColor:'#FFFFFF', width:(Dimensions.get('screen').width - 45  ),borderRadius:9,borderWidth:3,height:'auto', padding:7}}>
                    <View style={{height:'auto', flexDirection:'row'}}>
                        <View style={{flex:1,height:200}}>
                            {/* {loadingImage && <Image source={require('../../../assets/img/ImageFotoLoading.png')} style={{width:150, height:200}}/>} */}
                            {/* <Image 
                              
                                source={{uri : Config.REACT_APP_BASE_URL + `${String(JSON.parse(item.ticket_image[0].image)[0]).replace('public/', '')}`}} 
                                style={{flex:1}}
                                onLoadEnd={() => setLoadingImage(false)}
                                onLoadStart={() => setLoadingImage(true)}
                            /> */}
                        </View>
                        <View style={{paddingLeft:8,flex:1.2, height:'auto'}}>
                            <Text style={styles.title}>Tanggal : </Text>
                            <Text style={styles.data}>{item.created_at}</Text>
                            <Text style={styles.title}>Nama Pelanggan:</Text>
                            <Text style={styles.data}>{item.customer.namapelanggan}</Text>
                            <Text style={styles.title}>Ketegori :</Text>
                            <Text style={styles.data}>{item.category.name}</Text>
                            <Text style={styles.title}>Keterangan :</Text>
                            <Text style={styles.data}>{item.description}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:15}}>
                        <BtnDetail onPress={() =>navigation.navigate('ViewTicket', {ticket : item})}/>
                        <BtnAction onPress={() => navigation.navigate('Action', {ticket_id : item.id})}/>
                        <BtnEdit onPress={() => navigation.navigate('EditTicket', {ticket : item})}/>
                        <BtnDelete onPress ={() =>handleDelete(item.id) } />
                    </View>
                </View>
                {/* <TouchableOpacity onPress={() => console.log(JSON.parse(item.ticket_image[0].image)[0])}><Text>asjdskdsncdscsdc</Text></TouchableOpacity> */}
            </View>
        )
    }

    const FooterFlat = () => {
        return (
            <Footer navigation={navigation} focus='Menu'/>
        )
    }



    // base content
    return (
        <SafeAreaView style={{flex : 1}}>
             {loading && <Spinner/>}
            <View style={styles.container}>
                <Header/>
                <FlatList
                    // scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={dataTickets}
                    ItemSeparatorComponent={ItemSeparatorView}
                    // ListHeaderComponent={Header}
                    contentContainerStyle={{alignItems : 'center'}}
                    renderItem={renderItem}
                    ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
                    onEndReached={ success ?  getData : null}
                    // onEndReachedThreshold={0.1}
                />
            </View>
            <FooterFlat/> 
       </SafeAreaView>
    )
}

export default Ticket

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
