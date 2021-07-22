import React from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'

const Spinner = () => {
    return (
        <View style={{ position :'absolute', width :'100%', height : Dimensions.get('screen').height, zIndex:2, justifyContent : 'center', backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
            <ActivityIndicator color='blue' size={50} />
        </View>
    )
}

export default Spinner
