/**
 * Starting point for Multi-Learner Questions App
 * 
 * @CaseyRock
 */

import React from 'react';
import Routes from './src/app/Routes';
import { NavigationContainer } from '@react-navigation/native';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    );
  }
}
