import axios from 'axios'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Select2 from 'react-native-select-two'
import Button from '../../component/Button'

const Ongkir = () => {
    const [province, setProvince] = useState(null)


    const getProvince = () => {
        axios.get('https://api.rajaongkir.com/starter/province' ,{
            headers: {
                key : 'a4dcb505f795abcf44a5d341babfb85e'
            }
        }).then((result) => {
            // console.log(result.data.rajaongkir.result);
            let province = result.data.rajaongkir.results;

            province.forEach(obj => renameKey(obj, 'province_id', 'id'));
            province.forEach(obj => renameKey(obj, 'province', 'name'));

            setProvince(province)
            
        }).catch((e) => {
            console.log(e);
        })
    }


    const renameKey = (obj, old_key, new_key) => {   
        // check if old key = new key  
            if (old_key !== new_key) {                  
               Object.defineProperty(obj, new_key, // modify old key
                                    // fetch description from object
               Object.getOwnPropertyDescriptor(obj, old_key));
               delete obj[old_key];                // delete old key
               }
        }
  

    return (
        <View>
            <Text>Ongkir</Text>
            <Button title = 'province' onPress = {getProvince} />
            {province && <Select2
                searchPlaceHolderText='Cari Province'
                title='Province'
                isSelectSingle
                style={{ borderRadius: 5 }}
                colorTheme={'blue'}
                popupTitle='Ubah Status'
                data={province}
                // onSelect={data => {
                //     setForm({...form, status : data[0]})
                // }}
                // onRemoveItem={data => {
                //     setForm({...form, status : data[0]})
                // }} 
                selectButtonText ='Simpan'
                cancelButtonText='Batal'
            />}
        </View>
    )
}

export default Ongkir

const styles = StyleSheet.create({})
