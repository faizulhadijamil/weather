import React from 'react';

import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
// import { createStore, combineReducers } from 'redux';
// import { connect, Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from "react-navigation";

// for pages
import HomeScreen from './Home';
const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
    },
    {
      initialRouteName: "Home",
      /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            title: 'Weather',
            headerStyle: {
            backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        },
    }
);

export default createAppContainer(AppNavigator);

console.ignoredYellowBox = [
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate',
];