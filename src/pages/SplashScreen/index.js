import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet,Text,ImageBackground} from 'react-native';
import { useDispatch } from 'react-redux';
import { SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
  const SplashScreen=({navigation})=>{
      const image =require('../../assets/img/SplashScreen.png')
      const dispatch = useDispatch();
      useEffect(() => {
            let isAmounted = false
           if(!isAmounted){
                  Promise.all([getDataUser(), getDataToken()])
                  .then(response => {
                        if(response[0] !== null && response !== response[1]){
                              dispatch(SET_DATA_USER(response[0]))
                              dispatch(SET_DATA_TOKEN(response[1]))
                              setTimeout(() => {
                                    navigation.replace('Home')
                              }, 2000);
                        }else{
                              setTimeout(() => {
                                    navigation.replace('Login')
                              }, 2000);
                        }
                  }).catch((e) => {
                        setTimeout(() => {
                              navigation.replace('Login')
                        }, 2000);
                        console.log('data local tidak dibaca');
                  })
           }
            return () => {
                  isAmounted= true
            }
      }, [])


      
      const getDataUser = async () => {
            try {
            const jsonValue = await AsyncStorage.getItem('@LocalUser')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
            // console.log('local user',jsonValue);
            } catch(e) {
            // error reading value
            }
      }
      
      const getDataToken = async () => {
            try {
              const value = await AsyncStorage.getItem('@LocalToken')
              if(value !== null) {
                  return value
              }
            } catch(e) {
              // error reading value
            }
      }
    
      return (
        <ImageBackground source={image} style={styles.image}>
        </ImageBackground>
      )
  }
  
  const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
  })
  export default SplashScreen