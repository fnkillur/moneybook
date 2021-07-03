/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import firebase from '@react-native-firebase/app';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './src/modules';
import Navigator from './src/components/Navigator';

const store = createStore(rootReducer);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyBVk19GJ6LG5smG5pj8j2rlgauiyBJei6k',
      authDomain: 'where-is-our-money-8c013.firebaseapp.com',
      databaseURL:
        'https://where-is-our-money-8c013-default-rtdb.firebaseio.com',
      projectId: 'where-is-our-money-8c013',
      storageBucket: 'where-is-our-money-8c013.appspot.com',
      messagingSenderId: '788440978257',
      appId: '1:788440978257:web:24e9a36ad815373372b970',
      measurementId: 'G-QBW40HBSWZ',
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigator />
    </Provider>
  );
};

export default App;
