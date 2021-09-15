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
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email : null,
        password : null,
        _id_onesignal : null
    })
    const [loading, setLoading]= useState(true)
    
    useEffect(() => {
        if(isFocused){
           signupOnesignal().then((result) => {
                // alert(result);
                console.log('update onesignal',result);
                setForm({...form, _id_onesignal : result})
                setLoading(false)
           }).catch(e => {
               console.log(e);
                alert(e)
               setLoading(false)
           }) 
        }

        // return () => {
        //    setForm({
        //        password : null,
        //        _id_onesignal : null,
        //        email : null
        //    })
        // }
    }, [isFocused])

    const signupOnesignal = async () => {
        // dispatch(token_api_one_signal(device['userId']))
        const device = await OneSignal.getDeviceState();
        return device.userId;
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

    const handleAction =  () => {
        setLoading(true)
        const user  ={
            email : form.email,
            password : form.password,
            _id_onesignal : form._id_onesignal
        }
        if(!user._id_onesignal){
            signupOnesignal().then((result) => {
                // alert(result);
                console.log('update onesignal',result);
                user._id_onesignal =  result
                if(user._id_onesignal){
                    
                    handleLogin(user);
                }
            }).catch(e => {
                alert('cath')
                handleLogin(user)
                console.log(e);
            }) 
        }else{
            handleLogin(user)
        }
    
       
    }

    const handleLogin = (user) => {
        if(user.email != null && user.password !=null && user._id_onesignal ){
            API.login(user).then((result) => {
                if(result.success){
                    result.data['password'] = result.password;
                    // dispatch(SET_DATA_USER(result.data))
                    // dispatch(SET_DATA_TOKEN(result.token))
                    // dispatch(SET_DATA_PERMISSION(result.permission))
                    // storeDataToken(result.token)
                    // storeDataUser(result.data)
                    // storeDataPermission(result.permission)
                    // navigation.replace('Home')
                    Promise.all([storeDataPermission(result.permission),storeDataUser(result.data),storeDataToken(result.token)]).then((success)=>{
                        dispatch(SET_DATA_USER(result.data))
                        dispatch(SET_DATA_TOKEN(result.token))
                        dispatch(SET_DATA_PERMISSION(result.permission))
                        navigation.replace('Home')
                    }).catch(e => console.log(e)).finally(f => setLoading(false))
                }else{
                    alert(result.message)
                    setLoading(false)
                }
            });
        }else{
            alert('mohon lengkapi data')
        }
    }

    if(loading){
        return(
            <Spinner/>
        )
    }

    return(
        <View style={styles.container}>
            {/* {loading && <Spinner/>} */}
            <ScrollView>
                <Header text='Login'/>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'90%'}}>
                        <View style={styles.baseBoxShadow} >
                            <View style={styles.boxShadow} >
                                <Txt title='Email'/>
                                <Inpt placeholder='Masukan Email' onChangeText={(item) => setForm({...form, email : item})} />
                                <Txt title='Password'/>
                                <Inpt placeholder='Masukan Password' secureTextEntry={true}  onChangeText={(item) =>  setForm({...form, password : item})}  />
                                <Distance distanceV={10}/>
                                <In title='Login' onPress={handleAction}/>
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