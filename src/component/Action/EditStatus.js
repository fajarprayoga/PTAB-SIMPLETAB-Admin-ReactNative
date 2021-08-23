import { faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { TouchableOpacity, View,Text } from 'react-native'
import { colors } from '../../utils/colors'
import Distance from '../../utils/distance'

const EditStatus =(props)=>{
    return(
        <View style={{flex:1,paddingHorizontal:5}}>
            <TouchableOpacity style={{alignItems:'center'}}onPress={props.onPress}>
                <View style={{backgroundColor:colors.warning,width:36, height:36, borderRadius:50,justifyContent:'center',alignItems:'center'}} >
                    <FontAwesomeIcon icon={faTools} style={{color:'#FFFFFF', paddingVertical:5}} size={ 16 } />
                </View>
                <Text style={{color:'696969'}}>Update Status</Text>
            </TouchableOpacity>
        </View>
    )
}
export default EditStatus