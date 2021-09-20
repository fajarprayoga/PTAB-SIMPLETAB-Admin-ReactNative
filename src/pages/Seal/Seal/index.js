import React,{useEffect,useState} from 'react'
import {Text,StyleSheet,Dimensions,FlatList, SafeAreaView,View, Alert, Image,ImageBackground } from 'react-native'
import { colors, Distance } from '../../../utils';
import { Btn, BtnAdd, BtnDelete, BtnAction, BtnDetail, BtnEdit, Footer, HeaderForm, Spinner, Title, Dropdown } from '../../../component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';


const TextInfo = (props) => {
    return (
        <View style={{ paddingBottom: 5 }}>
            <View style={{ flexDirection: 'column', height: 'auto'}}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textTiltle}>{props.title}</Text>
                    </View>
                    <View style={{flex:0.7}}>
                        <Text style={styles.textTiltle}>:</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textItem}>{props.item}</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

const MeterSeal =({ navigation })=>{
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)
    const [lastPage, setLastPage] = useState()

    const [segel, setSegel] = useState(
        [{id: '1', value: 'A' },{ id: '2', value: 'B' },{ id: '3', value: 'C' }]
    )
    const [page, setPage] = useState(1)
    const handleLoadMore = () => {
        if (page < lastPage) {
            setPage(page + 1);
        }
    }
    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    marginVertical: 10
                }}
            />
        );
    };

    const onRefresh = () => {
        setRefresh(true)
      
    }
    const renderItem=()=>{
        return(
            <View style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#F0D63C', width: 200, height: 35, borderTopRightRadius: 15, borderTopLeftRadius: 15, alignItems: 'center' }}>
                        <Text style={styles.textStatus} >Pending</Text>
                    </View>
                    <View style={[styles.content, { borderColor: '#FFF6C2' }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1,height:200, paddingTop:3, alignItems:'center', justifyContent:'center'}}>
                            <ImageBackground source={require('../../../assets/img/ImageFotoLoading.png') } style={{ width: 120, height: 150}} >
                                <Image
                                    source={require('../../../assets/img/ImageFotoLoading.png') }
                                    style={{ flex: 1, height:'100%' }} 
                                />
                                </ImageBackground>
                            </View>
                            <View style={[styles.textnfo, { flex: 1 }]}>
                                <TextInfo title='Tanggal' item='asd' />
                                <TextInfo title='Nama' item='Pelanggan'/>
                                <TextInfo title='Code' item='123'/>
                                <TextInfo title='Kategori' item='Disegel' />
                                <TextInfo title='Deskripsi' item='Maaf' />
                                <TextInfo title = 'Memo Pengerjaan' item='Proses Penyegelan'/>
                            </View>
                        </View>
                        <View style={{backgroundColor:'#f4f4f4', width:'100%', height:2, marginVertical:5}}></View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', width: '95%', height: 'auto', paddingTop: 5 }}>
                                <BtnDetail onPress={() => navigation.navigate('ViewSeal')}/>
                                <BtnEdit onPress={() => navigation.navigate('EditSeal')}/>
                                <BtnDelete onPress={() => navigation.navigate('ViewTicket')}/>
                                <BtnAction onPress={() => navigation.navigate('ViewTicket')}/>
                            </View>
                        </View>
                    </View>
                </View>
        )
    }
    return(
        <SafeAreaView style={{ flex: 1 }}>
            {/* {loading && <Spinner />} */}
            <View style={styles.container}>
                <HeaderForm />
                <View style={{ paddingHorizontal: 20 }}>
                    <Title title='Segel Meter' />
                        <BtnAdd
                            title="Tambah Segel"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={() => navigation.navigate('AddSeal')}
                        />
        
                    <Distance distanceV={10} />
                    <View style={{ flexDirection: 'row' }}>
                       <View style={{width : '60%'}}>
                        <Dropdown 
                                items ={[
                                    {label : 'All', value : ''},
                                    {label : 'Pending', value : 'pending'},
                                    {label : 'Active', value : 'active'},
                                    {label : 'Close', value : 'close'}
                                ]}
                            />
                       </View>
                        <Distance distanceH={5} />
                        <Btn
                            title='Filter'
                            width='35%'
                            icon={<FontAwesomeIcon icon={faSearch} style={{ color: '#FFFFFF' }} size={27} />}
                        />
                    </View>
                    <Distance distanceV={10} />
                </View>
             
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={segel}
                  ItemSeparatorComponent={ItemSeparatorView}
                  contentContainerStyle={{ alignItems: 'center' }}
                  renderItem={renderItem}
                  ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0}
                  onRefresh={onRefresh}
                  refreshing={refresh}
                  /> 
            </View>
            <Footer navigation={navigation} focus='Menu' />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    content: {
        borderWidth: 3,
        width: Dimensions.get('screen').width - 45,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FFFFFF'
    },
    search: {
        backgroundColor: '#ffffff',
        width: '60%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 20
    },
    textnfo: {
        paddingHorizontal: 10,
    },
    textTiltle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#696969'
    },
    textItem: {
        fontSize: 15,
        color: '#696969'
    },
    textStatus: {
        color: '#FFFFFF',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        paddingTop: 5
    },
})
export default MeterSeal