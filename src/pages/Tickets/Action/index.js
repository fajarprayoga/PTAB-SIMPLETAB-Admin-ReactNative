import React, { useEffect, useState } from 'react'
import {View,ScrollView,StyleSheet, TouchableOpacity, Text,Dimensions} from 'react-native'
import {HeaderForm,BtnAdd,BtnStaff,BtnEdit,BtnDelete,BtnDetail,Footer,Title, Spinner} from '../../../component';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {colors,Distance} from '../../../utils'
import API from '../../../service';
import { useSelector } from 'react-redux';
import { Col, Rows, TableWrapper, Table, Row } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';



const TextInfo = (props) => {
    return (
    <View style={{paddingBottom:5}}>
        <View style={{flexDirection:'column',height:'auto'}}>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1, }}>
                    <Text style={styles.textTiltle}>{props.title}</Text>
                </View>
                <View style={{flex:0.1}}>
                    <Text style={styles.textTiltle}>:</Text>
                </View>
                <View style={{flex:2.2 }}>
                    <Text style={styles.textItem}>{props.data}</Text>
                </View>
            </View>
        </View>
    </View>
    )
}

const Action=({navigation, route})=>{
    const Permission = useSelector((state) => state.PermissionReducer);
    const [loading, setLoading] = useState(true)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const isFocused = useIsFocused();
    const [actions, setActions] =useState(null)

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            actionsAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    const actionsAPi = () => {
        API.actions(route.params.ticket_id, TOKEN).then((result) => {
            setActions( result.data)
            setLoading(false)
            console.log('nilai staf', result.data)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }


    const handleDelete =($id) => {
        setLoading(true)
        API.actionsDelete($id, TOKEN).then((result) => {
            // console.log(result);
            alert(result.data.message)
            ticketsAPi();
            // setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }

    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            {/* <ScrollView> */}
                <HeaderForm/>
                <View style={{alignItems:'center', flex : 1}}>
                    <View style={{width:'90%'}}>
                        <Title title='Daftar Tindakan'/>
                        {Permission.includes('action_create') &&
                            <BtnAdd
                                title="Tambah Tindakan"
                                width='60%'
                                icon={faPlusCircle}
                                onPress={()=>navigation.navigate('AddAction', {ticket_id : route.params.ticket_id})}
                            />
                        }
                        <Distance distanceV={10}/>

                        {actions && actions.map((item, index) => {
                            
                        return(
                        <View>
                        <View style={styles.content}>
                            <View style={styles.textnfo}>
                                <TextInfo title = 'Status' data={item.status} />
                                <TextInfo title = 'Deskripsi' data={item.description}/>                                
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                <View style={{flexDirection:'row',width:'80%',height:'auto',paddingTop:5}}>
                                {Permission.includes('action_show') &&
                                    <BtnDetail onPress={() => navigation.navigate('ViewAction', {action : item})}/>
                                }
                                {Permission.includes('action_show') &&
                                    <BtnStaff onPress={() => navigation.navigate('StaffAction', {action_id : item.id})}/>
                                }
                                {Permission.includes('action_staff_access') &&
                                    <BtnEdit onPress={() => navigation.navigate('EditAction', {action : item})}/>
                                }
                                {Permission.includes('action_delete') &&
                                    <BtnDelete onPress={() => handleDelete(item.id)}/>
                                }
                                </View>
                            </View>
                        </View>
                        <Distance distanceV={10}/>
                        </View>
                         )})} 
                    </View>
                </View>
            {/* </ScrollView> */}
            <Footer navigation={navigation} focus='Home'/>
       </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    content : {
        borderWidth : 3,
        borderColor: '#CFEDFF',
        width : Dimensions.get('screen').width - 45,
        borderRadius : 10
        // marginVertical : 20
    },
    title:{
        fontSize:15, 
        fontWeight:'bold', 
        color:'#696969',
        paddingVertical:5
   },
    textnfo : {
        paddingHorizontal : 10,
        paddingVertical : 10,
    },
    textTiltle : {
        fontWeight : 'bold',
        fontSize : 15,
        color:'#696969'
    },
    textItem : {
        fontSize : 15,
        color:'#696969'
    }
})
export default Action
