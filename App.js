/**
 * Starting point for Multi-Learner Questions App
 * 
 * @CaseyRock
 */

import { initializeApp } from 'firebase/app'
import firebaseConfig from './src/app/firebase/firebaseApp'

import React from 'react';
import Routes from './src/app/Routes';
import { NavigationContainer } from '@react-navigation/native';

initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    );
  }
}
