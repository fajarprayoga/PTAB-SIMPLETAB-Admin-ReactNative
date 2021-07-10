import * as React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import {faAlignJustify, faHome, faUser,} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Footer = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.section} >
                <TouchableOpacity style={styles.icon} onPress={() => props.navigation.navigate('Home')}>
                    <FontAwesomeIcon icon={faHome} style={{color:'#0C5CBF'}} size={ 27 } color = {props.focus === 'Home' ? '#1DA0E0' : ''} />
                    <Text style={styles.text} >Beranda</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section} >
                <TouchableOpacity style={styles.icon} onPress={() => props.navigation.navigate('Master')} >
                    <FontAwesomeIcon icon={faAlignJustify} style={{color:'#0C5CBF'}} size={ 27 } color = {props.focus === 'Menu' ? '#1DA0E0' : ''} />
                    <Text style={styles.text} >Master</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section} >
                <TouchableOpacity style={styles.icon} onPress={() => props.navigation.navigate('Profile')}>
                    <FontAwesomeIcon icon={faUser} style={{color:'#0C5CBF'}} size={ 27 }  color = {props.focus === 'Profile' ? '#1DA0E0' : ''} />
                    <Text style={styles.text} >Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems:'center',
    },
    section:{
        flex:1,
        backgroundColor:'#ffffff',
        height:58,
       
    },
    icon:{
        alignItems:'center',
        padding:5,
    },
    text:{
        color:'#163F5F',
        fontSize:16,
        textAlign:'center'
    }
});
export default Footer