import React, {useEffect} from 'react';
import {StyleSheet,Text,ImageBackground} from 'react-native';

  const SplashScreen=({navigation})=>{
      const image =require('../../assets/img/SplashScreen.png')
      useEffect(() => {
          setTimeout(() => {
            navigation.replace('Login')
          }, 2000);
      })
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