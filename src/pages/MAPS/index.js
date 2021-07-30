import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview';

const MapsTicket = ({navigation, route}) => {
    const lat = route.params.lat;
    const lng = route.params.lng
    return (
        <View style={styles.container}>
             <WebView  source={{ uri: `https://maps.google.com/?q=${lat},${lng}`  }} />
        </View>
    )
}

export default MapsTicket

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'red'
    }
})
