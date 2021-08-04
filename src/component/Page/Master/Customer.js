import React,{useState} from 'react';
import { Text, View, StyleSheet,Image, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView} from 'react-native';
import Config from 'react-native-config';
import { BtnDelete,BtnAction,BtnDetail,BtnEdit } from '../../index';
import Distance from '../../../utils/distance'

const PageCustomer=(props)=>{
    const customers = props.data;
    const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);

    console.log('flat lsist custiomr',customers);
    const renderFooter = () => {
        return (
          //Footer View with Load More button
          <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
        //   onPress={getData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
        );
    };

    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };
    
    const getItem = (item) => {
    //Function for click on an item
        // alert('Id : ' + item.id + ' Title : ' + item.title);
    };

    const ItemView = ({item}) => {
        return (
            <View style={{paddingHorizontal : 10, borderColor : 'red', borderWidth:1, height:300}}>
               <Text>hao</Text>
            </View>
        );
    };


    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <FlatList
                    data={customers}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    enableEmptySections={true}
                    renderItem={ItemView}
                    ListFooterComponent={renderFooter}
                    contentContainerStyle={{backgroundColor:'red', paddingBottom:300}}
                    pagingEnabled={true}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
      },
      footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
      },
    textStatus:{
        color:'#FFFFFF', 
        fontSize:20, 
        alignItems:'center', 
        justifyContent:'center', 
        fontWeight:'bold',
        paddingTop:5
    },
    title:{
        fontSize:15, 
        fontWeight:'bold', 
        color:'black',
        paddingVertical:5
   },
    data:{
        color:'black'
   }
});
export default PageCustomer