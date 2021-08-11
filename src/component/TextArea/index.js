import React from 'react';
import {View,StyleSheet,} from 'react-native';
import Textarea from 'react-native-textarea';
import {colors} from '../../utils';

const TxtArea =(props)=>{
    return(
        <View style={{width:props.width ? props.width:'100%'}}>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              maxLength={255}
              placeholder={props.placeholder}
              placeholderTextColor={'#c7c7c7'}
              value={props.value}
              onChangeText  = {props.onChangeText}
              />
        </View>
    )
}
const styles = StyleSheet.create({
    textareaContainer: {
        height: 120,
        borderRadius:10,
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderColor:colors.border,
        borderWidth:1,
    },
    textarea: {
        textAlignVertical: 'top', 
        height: 170,
        fontSize: 14,
        color: '#696969',
    },
});    
export default TxtArea;