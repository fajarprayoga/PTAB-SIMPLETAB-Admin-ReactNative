import React from 'react';
import Router from './router'
import { NavigationContainer } from '@react-navigation/native';
import {
} from 'react-native';
import {store} from './redux'
import {Provider} from 'react-redux'
const App =()=>{
  return(
    <Provider store = {store}>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </Provider>
  )
}
export default App;
