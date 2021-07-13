import React,{ Component } from 'react';
import {View,Alert,StyleSheet, TouchableOpacity,Text} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

 class Tabel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHead: this.props.tbhead,
        tableData: this.props.tbdata
      }
    }
    _alertIndex(index) {
      Alert.alert(`This is row ${index + 1}`);
    }
   
    render() {
      const state = this.state;
      const element = (data, index) => (
        <View style={{paddingHorizontal:3,paddingVertical:5}}>
           {/* {state.tbdata[3].map((item, index) => {
               return (
                <TouchableOpacity key={index} style={{height:30,backgroundColor:item.color, marginVertical:3, justifyContent:'center', alignItems:'center',borderRadius:5}} onPress={item.onPress}>
                    <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:12}}>{item.name}</Text>
                </TouchableOpacity>
               )
           })} */}
        </View>
      );
      return (
      <View style={styles.containertable}>
          <Table borderStyle={{borderWidth: 1,borderColor: '#E5E7E9'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
              state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                  {
                      rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === this.props.cellindex ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                  }
                  </TableWrapper>
              ))
              }
          </Table>
      </View>
      )
    }
  }
  const styles = StyleSheet.create({
    containertable: { 
      flex: 1, 
      backgroundColor: '#FFFFFF' 
    },
    head: { 
      height: 50, 
      backgroundColor: '#EAF4FA' 
    },
    text: { 
      margin: 6
    },
    row: { 
      flexDirection: 'row', 
      backgroundColor: '#ffffff',  
    },

  });
  export default Tabel