import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../../screens/main/HomeScreen';
import CategoryScreen from '../../screens/main/category/CategoryScreen';
import CartScreen from '../../screens/main/cart/CartScreen';
import PersonalScreen from '../../screens/main/personal/PersonalScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {calculateWidth} from '../../constants/dimension';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="#6200EA"
      inactiveColor="#AEAEAE"
      barStyle={{backgroundColor: '#DDD'}}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="home" color={color} size={calculateWidth(5)} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="CategoryScreen"
        options={{
          tabBarLabel: 'Khám phá',
          tabBarIcon: ({color}) => (
            <FontAwesome5
              name="th-large"
              color={color}
              size={calculateWidth(5)}
            />
          ),
        }}
        component={CategoryScreen}
      />
      <Tab.Screen
        name="CartScreen"
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({color}) => (
            <FontAwesome5
              name="shopping-cart"
              color={color}
              size={calculateWidth(5)}
            />
          ),
        }}
        component={CartScreen}
      />
      <Tab.Screen
        name="AccountScreen"
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({color}) => (
            <FontAwesome5
              name="user"
              color={color}
              solid={true}
              size={calculateWidth(5)}
            />
          ),
        }}
        component={PersonalScreen}
      />
    </Tab.Navigator>
  );
}
