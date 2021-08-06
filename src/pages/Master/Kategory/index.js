import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { BtnAdd, BtnDelete, BtnEdit, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { Distance } from '../../../utils';

const TextInfo = (props) => {
    return (
        <View style={{paddingVertical:5}}>
            <View style={{flexDirection:'row',height:'auto'}}>
                <View style={{flex:1}}>
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

const Kategory=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [categories, setCategories]= useState([])
    const isFocused = useIsFocused();
    const [page, setPage] = useState(1)
    const [loadingLoadMore, setLoadingLoadMore] = useState(false)
    const [lastPage, setLastPage] = useState()

    var resetData = false;
    // useEffect(() => {
    //     setLoading(true)
    //    getData()
    //    return () => {
    //        setCategories([])
    //    }
    // }, [isFocused])

    const handleLoadMore = () => {
        if(page < lastPage){
            setPage(page + 1);
            // getData()
        }
    }

    useEffect(() => {
        if(isFocused){
            setLoading(true)
            getData()
        }else{
            setPage(1)
            setCategories([])
        }
        
    },[isFocused,page])

    const getData = async () => {
        API.categories(page,TOKEN).then((result) => {
            console.log(result)
            if(!resetData){
                setCategories(categories.concat(result.data.data)) 
                // resetData = false
            }else{       
            setCategories(result.data.data)
            }
            setLastPage(result.data.last_page)
            setLoading(false)
        }).catch(e =>{ 
            console.log(e)
            setLoading(false)
        })
        // console.log(page);
    };
    const handleDelete =($id) => {
        setLoading(true)
        API.categoriesDelete($id, TOKEN).then((result) => {
            resetData = true;
            getData();
            alert(result.data.message)
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
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

    const renderItem = ({item, index}) => {
    return(
        <View style={styles.content}>
            <View style={styles.textnfo}>
                <TextInfo title = 'Kode' item={index} />
                <TextInfo title = 'Nama Kategori' item={item.name}/>
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:5}}>
                <BtnEdit onPress={() =>navigation.navigate('EditKategory', {category : item})}/>
                <BtnDelete onPress={() => handleDelete(item.id)}/>
            </View>
        </View>
        )
    }

    return(
        <SafeAreaView style={{flex : 1}}>
            {loading && <Spinner/>}
            <View style={styles.container}>
                <HeaderForm/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <Title title='Kategori'/>
                        <BtnAdd
                            title="Tambah Kategori"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={()=>navigation.navigate('AddKategory')}
                        />
                    </View>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={categories}
                    ItemSeparatorComponent={ItemSeparatorView}
                    contentContainerStyle={{alignItems : 'center'}}
                    renderItem={renderItem}
                    ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0}
                />
            </View>
            <Distance distanceV={10}/>
            <Footer navigation={navigation} focus='Menu'/>
        </SafeAreaView>        
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor:'#F4F4F4'
    },
    content : {
        borderWidth : 3,
        borderColor: '#CFEDFF',
        width : Dimensions.get('screen').width - 45,
        borderRadius : 5,
        backgroundColor:'#FFFFFF'
    },
    title:{
        fontSize:15, 
        fontWeight:'bold', 
        color:'#696969',
        paddingVertical:5
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
export default Kategory
