import React from 'react'
import {View,ScrollView,StyleSheet} from 'react-native'
import {HeaderMenu,Footer,TitleMenu,Menu} from '../../component'
import {IconPermissions,IconRoles,IconUsers} from '../../assets/icon';

const UsersManagement=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderMenu/>
                <TitleMenu title='Users Management'/>
                    <Menu icon={<IconPermissions/>} title='PERMISSIONS' onPress={()=>navigation.navigate('Permissions')}/>
                    <Menu icon={<IconRoles/>} title='ROLES' onPress={()=>navigation.navigate('Roles')}/>
                    <Menu icon={<IconUsers/>} title='USERS' onPress={()=>navigation.navigate('Users')}/>
            </ScrollView>
            <Footer navigation={navigation} focus='Menu' />
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
})
export default UsersManagement