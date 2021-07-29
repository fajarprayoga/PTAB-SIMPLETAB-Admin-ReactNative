import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'
import Distance from '../../utils/distance'

const IconStaff =(props)=>{
    return(
        <View style={{width:36}}>
            <Distance distanceV={1}/>
            <TouchableOpacity style={{backgroundColor:colors.success, height:36, borderRadius:50,justifyContent:'center',alignItems:'center'}} onPress={props.onPress}>
                <FontAwesomeIcon icon={faUser} style={{color:'#FFFFFF', paddingVertical:5}} size={ 16 } />
            </TouchableOpacity>
            <Distance distanceV={1}/>
        </View>
    )
}
export default IconStaff