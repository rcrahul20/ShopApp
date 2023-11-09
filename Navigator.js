// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import ProductScreen from './ProductScreen';
import ProductDetailScreen from './ProductDetailScreen';
import CartScreen from './CartScreen';
import MainScreen from './MainScreen';

// const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Products' }} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Cart' }} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
