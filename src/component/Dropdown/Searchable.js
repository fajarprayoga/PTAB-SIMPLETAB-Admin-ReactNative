import React,{useState } from 'react';
import {View,} from 'react-native';
import SearchableDropDown from 'react-native-searchable-dropdown';
const Searchable=(props)=>{
const [selectedItem, setSelectedItem] =useState({})
var data = props.data
return (
    <View style={{width:props.width ? props.width:'100%'}}>
        <SearchableDropDown
        selectedItems = {selectedItem}
        onItemSelect={(item) => {
            setSelectedItem(item)
        }}
        itemStyle={{
            padding: 10,
            backgroundColor: '#ffffff',
            borderColor: '#087CDB',
            borderBottomWidth: 1,
            // borderRadius: 5,
        }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 180 }}
        items={data}
        textInputProps={
            {
            placeholder: props.placeholder,
            underlineColorAndroid: "transparent",
            style: {
                padding: 12,
                borderWidth: 1,
                borderColor: '#087CDB',
                borderRadius: 10,
                backgroundColor:'#ffffff',
                width:'100%'
            },
            }
        }
        listProps={
            {
            nestedScrollEnabled: true,
            }
        }
        />
    </View>
)
}   
export default Searchable