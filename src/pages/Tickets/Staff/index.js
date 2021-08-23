import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View,RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { BtnAdd, BtnDelete, BtnEditStatus, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { Distance } from '../../../utils';


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
                <View style={{flex:2}}>
                    <Text style={styles.textItem}>{props.data}</Text>
                </View>
            </View>
        </View>
    </View>
    )
}

const Staff=({navigation, route})=>{
    const [loading, setLoading] = useState(true)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const isFocused = useIsFocused();
    const [staffs, setStaffs] = useState(null)
    const Permission = useSelector((state) => state.PermissionReducer);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
            API.actionStaffs(route.params.action_id, TOKEN).then((result) => {
                setStaffs(result.data)
    
                setLoading(false)
            }).catch((e) => {
                console.log(e.request);
            }).finally(() => setRefreshing(false))
        
      }, []);


    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            actionStaffListsAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])


    const actionStaffListsAPi = () => {
        API.actionStaffs(route.params.action_id, TOKEN).then((result) => {
            setStaffs(result.data)

            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }

    const handleDelete =(action, staff) => {
        setLoading(true)
        API.actionStaffDestroy({action_id : action, staff_id : staff}, TOKEN).then((result) => {
            // console.log(result);
            alert(result.data.message)
            actionStaffListsAPi();
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
            }>
                <HeaderForm/>
                <View style={{alignItems:'center', flex : 1}}>
                    <View style={{width:'90%'}}>
                        <Title title='Staff yang Ditugaskan'/>
                        {Permission.includes('action_staff_create') &&
                            <BtnAdd
                                title="Tambah Staff"
                                width='60%'
                                icon={faPlusCircle}
                                onPress={()=>navigation.navigate('AddStaffAction', {action_id : route.params.action_id})}
                            />
                        }
                        <Distance distanceV={10}/>
                        {staffs && staffs.staff.map((item, index) => {
                            return(
                                <View style={{alignItems:'center'}}>
                                <View style={[styles.content]}>
                                <View style={{flexDirection:'row'}}>
                                       <View style={{flex:1,height:150, paddingTop:3, alignItems:'center'}}>
                                         <Image source={require('../../../assets/img/staff-avatar.jpeg')} style={{width:91,height:140}}/>
                                       </View>
                                       <View style={[styles.textnfo, {flex:1.7}]}>
                                       {/* <TextInfo title = 'Status' data={item.pivot.status} /> */}
                                        <TextInfo title = 'Departemen' data={staffs.dapertement.name}/>
                                        <TextInfo title = 'Pegawai' data={item.name}/>
                                       </View>
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                    <View style={{flexDirection:'row',width:'60%',height:'auto',paddingTop:5}}>
                                            {/* {Permission.includes('action_staff_edit') &&
                                                <BtnEditStatus onPress={() => navigation.navigate('EditStaffAction', {action_staff : item, action : staffs})}/>
                                            } */}
                                            {Permission.includes('action_staff_delete') &&
                                                <BtnDelete onPress={() => handleDelete(staffs.id, item.id)}/>
                                            }
                                    </View>
                                </View>
                            </View>
                            <Distance distanceV={10}/>
                            </View>
                            )})}
                    </View>
                </View>
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
export default Staff
