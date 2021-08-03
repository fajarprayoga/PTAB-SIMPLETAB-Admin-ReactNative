import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import API from '../../../service';

const Customer=({navigation})=>{

    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState({
        search : 'surya',
        start : 0,
        end:1000,
    });
  const TOKEN = useSelector((state) => state.TokenReducer);
  useEffect(() => getData(), []);

  const getData = () => {
    console.log('getData');
    setLoading(true);

        API.customerstest(offset,TOKEN).then((result) => {
            // console.log(result)
            setOffset({
                ...offset,
                start : offset.end,
                end : offset.end + 1000,
            })
            console.log(result.data);
            setDataSource(result.data)
            setLoading(false)
        }).catch(e =>{ 
            console.log(e.request)
            setLoading(false)
        })
  };

//   const renderFooter = () => {
//         return (
//             //Footer View with Load More button
//             <View style={styles.footer}>
               
//             </View>
//         );
//     };


    const ItemView = ({item}) => {
        return (
            // Flat List Item
            // <Text
            //     style={styles.itemStyle}
            //     onPress={() => getItem(item)}>
            //     {item.id}
            //     {'.'}
            //     {item.namapelanggan}
            // </Text>
            <View style={{backgroundColor : 'red', padding : 20}} >
                <Text>haloao</Text>
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
        alert('Id : ' + item.id);
    };
    

 return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                enableEmptySections={true}
                renderItem={ItemView}
                // ListFooterComponent={renderFooter}
                 onEndReached={()=>alert('bawah')}
                  onEndReachedThreshold={0.1}
            />
             {/* <TouchableOpacity
                activeOpacity={0.9}
                onPress={loading ? null : getData}
                //On Click of button load more data
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>Load More</Text>
                {loading ? (
                    <ActivityIndicator
                    color="white"
                    style={{marginLeft: 8}} />
                ) : null}
                </TouchableOpacity> */}
        </View>
    </SafeAreaView>
 )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // flex: 1,
        height : 500
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
})
export default Customer
