import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'
import Distance from '../../utils/distance'

const IconEdit =(props)=>{
    return(
        <View style={{paddingHorizontal:5}}>
            <Distance distanceV={1}/>
            <TouchableOpacity style={{backgroundColor:colors.edit, width:36,height:36, borderRadius:50,justifyContent:'center',alignItems:'center'}} onPress={props.onPress}>
                <FontAwesomeIcon icon={faPencilAlt} style={{color:'#FFFFFF', paddingVertical:5}} size={ 16 } />
            </TouchableOpacity>
            <Distance distanceV={1}/>
        </View>
    )
}
export default IconEdit