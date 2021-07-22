import React,{ useEffect , useState}  from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,Inpt, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';

const EditKategory =({navigation, route})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    const [category, setCategory]  = useState(route.params.category)
    
    const handleForm = (key, value) => {
        setCategory({
            ...category,
            [key] :value
        })
    }

    const handleAction= () => {
        if(category.code !== '' && category.name !==''){
            setLoading(true)
            API.categoriesEdit(category, TOKEN).then((result) => {
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    navigation.navigate('Kategory')
                }
                console.log(result);
                setLoading(false)
            }).catch(e => {
                console.log(e.request);
                setLoading(false)
            })
        }
    }
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ImageBackground source={image} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <HeaderInput/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <Title title='Edit Kategori' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Masukan Kode' value ={category.code} onChangeText={(item) => handleForm('code', item)} />
                                    <Txt title='Kategori'/>
                                    <Inpt placeholder='Masukan Nama Kategori' value ={category.name} onChangeText={(item) => handleForm('name', item)}/>
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={handleAction}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
                <Footer navigation={navigation} focus='Menu'/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    baseBoxShadow : {
        alignItems : 'center',
        paddingVertical : 20,
    },
    boxShadow : {
        backgroundColor : '#ffffff',
        width : '100%',
        paddingHorizontal:20,
        paddingVertical : 30,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 3,
    }
})

export default EditKategory