 
import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import Constants from "expo-constants";

import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";

import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'


function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabNav = () => (
  <Tabs.Navigator
    initialRouteName="AddEntry"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Add Entry") {
          <FontAwesome name="plus-square" size={size} color={color} />
        } else if (route.name === "History") {
          <Ionicons name="ios-bookmarks" size={size} color={color} />
        } else if (route.name === "Live") {
          <Ionicons name="ios-speedometer" size={size} color={color} />
        }
      }
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 50,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}
  >
    <Tabs.Screen name="Add Entry" component={AddEntry} />
    <Tabs.Screen name="History" component={History} />
    <Tabs.Screen name="Live" component={Live} />
  </Tabs.Navigator>
)

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator headerMode="screen">
      <Stack.Screen
          name="Home"
          component={TabNav}
          options={{headerShown: false}}/>
      <Stack.Screen
          name="EntryDetail"
          component={EntryDetail}
          options={{
              headerTintColor: white, headerStyle: {
                  backgroundColor: purple,
              }
          }}/>
  </Stack.Navigator>
);

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <AppStatusBar backgroundColor={purple} barStyle="light-content" />
        <NavigationContainer>
          <MainNav/>
        </NavigationContainer>
      </View>
    </Provider>
  );
}