import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView,FlatList,Dimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { BtnAdd, Footer, HeaderForm, Spinner, Title,BtnEdit,BtnDelete } from '../../../component';
import API from '../../../service';

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
                <View style={{flex:1.2,flexDirection:'row'}}>
                    <Text style={styles.textItem}> {props.item}</Text>
                </View>
            </View>
        </View>
    )
}

const SubDepartemen=({navigation})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    const [loading, setLoading] = useState(true)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const isFocused = useIsFocused();
    const [departement, setDepartement] = useState([])
    const [page, setPage] = useState(1)
    const [loadingLoadMore, setLoadingLoadMore] = useState(false)

    const handleLoadMore = () => {
        setLoadingLoadMore(true)
        setPage(page + 1);
    }

    useEffect(() => {
        let isAmounted = true 
        if(isAmounted){
             getData()
        }
 
        return () => {
            isAmounted = false
        }
     }, [isFocused,page])

     const getData = async () => {
        API.dapertements(page,TOKEN).then((result) => {
            console.log(result)
            setDepartement(departement.concat(result.data.data)) 
            // setDataDepartement(result.data.data)
            
            setLoading(false)
        }).catch(e =>{ 
            console.log(e)
            setLoading(false)
        })
        // console.log(page);
    };

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
                    <TextInfo title = 'Kode' item={item.code} />
                    <TextInfo title = 'Nama Departemen' item={item.name}/>
                    <TextInfo title = 'Nama Deskripsi' item={item.description}/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:5}}>
                    <BtnEdit onPress={() =>navigation.navigate('EditKategory', {category : item})}/>
                    <BtnDelete/>
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
                            <Title title='Departemen'/>
                            <BtnAdd
                                title="Tambah Departemen"
                                width='60%'
                                icon={faPlusCircle}
                                onPress={()=>navigation.navigate('AddDepartemen')}
                            />
                        </View>
                    </View>
                    <FlatList
                    // scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={departement}
                    ItemSeparatorComponent={ItemSeparatorView}
                    // ListHeaderComponent={Header}
                    contentContainerStyle={{alignItems : 'center'}}
                    renderItem={renderItem}
                    ListFooterComponent={loadingLoadMore ? <Text>Sedang Memuat</Text> : null}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0}
                    />
                <Footer navigation={navigation} focus='Menu'/>
            </View>
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
export default SubDepartemen
