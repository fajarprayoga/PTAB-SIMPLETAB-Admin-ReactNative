import React, { useState } from 'react';
import {View,ScrollView,StyleSheet} from 'react-native';
import {Header,Inpt,Txt,In, Spinner} from '../../component';
import { Distance } from '../../utils';
import API from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
const Login =({navigation})=>{

    const [loading, setLoading]= useState(false)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email : null,
        password : null,
    })

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key] :  value
        })
    }

    const handleAction = () => {
        if(form.email != null && form.password){
            setLoading(true)
            API.login(form).then((result) => {
                dispatch(SET_DATA_USER(result.data))
                dispatch(SET_DATA_TOKEN(result.token))
                storeDataToken(result.token)
                storeDataUser(result.data)
                navigation.replace('Home')
                console.log(result);
                setLoading(false)
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        }else{
            alert('Mohon isi data dengan Lengkap')
        }
    }

    const storeDataUser = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@LocalUser', jsonValue)
        } catch (e) {
          console.log('no save')
        }
    }

    const storeDataToken = async (value) => {
        try {
          await AsyncStorage.setItem('@LocalToken', value)
        } catch (e) {
          console.log('TOken not Save ')
        }
    }
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ScrollView>
                <Header text='Login'/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <View style={styles.baseBoxShadow} >
                            <View style={styles.boxShadow} >
                                <Txt title='Email'/>
                                <Inpt placeholder='Masukan Email' onChangeText={(item) => handleForm('email',item)} />
                                <Txt title='Password'/>
                                <Inpt placeholder='Masukan Password' secureTextEntry={true}  onChangeText={(item) => handleForm('password',item)} />
                                <Distance distanceV={10}/>
                                <In title='Login' onPress={handleAction}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    baseBoxShadow : {
        alignItems : 'center',
        paddingVertical : 20
    },
    boxShadow : {
        top:-40,
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
    },
    text:{
        fontSize:16, 
        color:'#696969',
        paddingTop : 20 
    }
})
export default Login