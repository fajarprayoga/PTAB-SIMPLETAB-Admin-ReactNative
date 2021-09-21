import React,{useEffect, useState} from 'react'
import {View,ScrollView,StyleSheet,TouchableOpacity, Text} from 'react-native'
import {HeaderBeranda,Line,Footer,TitleMenu} from '../../component'
import {SliderBox} from "react-native-image-slider-box";
import {IconTiket,IconMaster,IconUsersManagement,IconSegelMeter,IconNone} from '../../assets/icon';
import {Distance} from '../../utils';
import { useSelector } from 'react-redux';

const Home =({navigation})=>{
    const Permission = useSelector((state) => state.PermissionReducer);
    
    const [images,setImages]=useState([
        require('../../assets/img/Banner1.png'),
        require('../../assets/img/Banner2.png'),
        require('../../assets/img/Banner3.png'),
        require('../../assets/img/Banner4.png')
    ]);
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderBeranda/>
                    <View style={{height:200,alignItems:'center'}}>
                        <SliderBox
                        images={images}
                        sliderBoxHeight={200}
                        parentWidth={350}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor="#00F6FD"
                        inactiveDotColor="#90A4AE"
                        paginationBoxVerticalPadding={20}
                        autoplay
                        circleLoop
                        />
                    </View>
                <TitleMenu title='Menu'/>
                <Distance distanceV={10}/>
                <View style={{alignItems:'center'}}>
                    <View style={styles.menuStyle}>
                        {Permission.includes('ticket_access') &&
                            <TouchableOpacity onPress={()=>navigation.navigate('Ticket')}>
                                <IconTiket/>
                            </TouchableOpacity>
                        }
                        
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('SealMeter')}>
                            <IconSegelMeter/>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>navigation.navigate('Master')}>
                            <IconMaster/>
                        </TouchableOpacity>
                        {Permission.includes('user_management_access') &&
                            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                                <IconUsersManagement/>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                {/* <Distance distanceV={20}/> */}
                {/* <View style={{alignItems:'center'}}>
                    <View style={styles.menuStyle}>
                            {Permission.includes('user_management_access') &&
                            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                                <IconUsersManagement/>
                            </TouchableOpacity>
                        }
                            <IconNone/>
                            <IconNone/>  
                    </View>
                </View> */}
                <Distance distanceV={20}/>
            </ScrollView>
            <Footer navigation={navigation} focus='Home'/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    menuStyle:{
        flex:1,
        flexDirection:'row', 
        width:'100%', 
        justifyContent:'space-evenly'
    }
});
export default Home