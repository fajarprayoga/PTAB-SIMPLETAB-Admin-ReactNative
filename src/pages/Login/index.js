import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { useDispatch } from 'react-redux';
import { Header, In, Inpt, Spinner, Txt } from '../../component';
import { SET_DATA_PERMISSION, SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
import API from '../../service';
import { Distance } from '../../utils';
import { useIsFocused } from '@react-navigation/native';
const Login =({navigation})=>{

    const [loading, setLoading]= useState(false)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch();
    const [TokenApiOneSignal, setTokenApiOneSignal] = useState()
    const [form, setForm] = useState({
        email : null,
        password : null,
        _id_onesignal : null
    })

    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            notif();
        }

        // return() => {
        //     setForm({
        //         email : null,
        //         password : null,
        //         _id_onesignal : null
        //     })
        // }
    },[])

    const notif = async () => {
        try{
          OneSignal.setAppId("282dff1a-c5b2-4c3d-81dd-9e0c2b82114b");
          OneSignal.setLogLevel(6, 0);
          OneSignal.setRequiresUserPrivacyConsent(false);
          // dispatch(token_api_one_signal(device['userId']))
          const device = await OneSignal.getDeviceState()
          setForm({_id_onesignal : device.userId})
        } catch(e){
          console.log(e);
            return null;
        }
      }
      
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
                if(result.success){
                    result.data['password'] = result.password;
                    dispatch(SET_DATA_USER(result.data))
                    dispatch(SET_DATA_TOKEN(result.token))
                    dispatch(SET_DATA_PERMISSION(result.permission))
                    storeDataToken(result.token)
                    storeDataUser(result.data)
                    storeDataPermission(result.permission)
                    navigation.replace('Home')
                    // console.log(result);
                }else{
                    alert(result.message)
                }
                console.log(result);
                setLoading(false)
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        }else{
            alert('Mohon isi data dengan Lengkap')
        }
        // notif();
        // console.log(form);

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

    const storeDataPermission = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@LocalPermission', jsonValue)
        } catch (e) {
        console.log('no save', e)
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