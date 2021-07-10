import React,{useState} from 'react'
import {View,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import {HeaderMenu,Line,Footer,TitleMenu} from '../../component'
import {SliderBox} from "react-native-image-slider-box";
import {IconTiket,IconMaster,IconUsersManagement} from '../../assets/icon';
import {Distance} from '../../utils';

const Menu =({navigation})=>{
    const [images,setImages]=useState([
        require('../../assets/img/Banner1.png'),
        require('../../assets/img/Banner2.png'),
        require('../../assets/img/Banner3.png'),
        require('../../assets/img/Banner4.png')
    ]);
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderMenu/>
                <Line/>
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
                        <TouchableOpacity onPress={()=>navigation.navigate('Ticket')}>
                            <IconTiket/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Master')}>
                            <IconMaster/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('UsersManagement')}>
                            <IconUsersManagement/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} focus='Menu'/>
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
        width:'90%', 
        justifyContent:'space-between'
    }
});
export default Menu