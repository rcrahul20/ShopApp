import React from 'react';
import { StyleSheet, Text,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProductsList } from './screens/ProductsList.js';
import { ProductDetails } from './screens/ProductDetails.js';
import { Cart } from './screens/Cart.js';
import { CartIcon } from './components/CartIcon.js';
import { CartProvider } from './CartContext.js';
import MainScreen from './MainScreen.js';
import Login from './screens/Login.js';

const Stack = createNativeStackNavigator();
const CustomHeader = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
       <View style={styles.headerSub}> 
      <Text style={styles.headerTitle}>{title}</Text>
      <CartIcon navigation={navigation} />
      </View>
    </View>
  );
};
function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} 
        options={({ navigation }) => ({
          // title: 'Home',
          // headerTitleStyle: styles.headerTitle,
          // headerRight: () => <CartIcon navigation={navigation}/>
          header: () => (
            <CustomHeader title="Home" navigation={navigation} />
          )
         })} />

          <Stack.Screen name='Products' component={ProductsList} 
          options={({ navigation }) => ({
            title: 'Products',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation}/>
          })}/>
         <Stack.Screen name='Login' component={Login} 
          options={({ navigation }) => ({
            title: 'Login',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation}/>
          })}/>
          <Stack.Screen name='ProductDetails' component={ProductDetails} 
          options={({ navigation }) => ({
            title: 'Product details',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation}/>,
          })} />
          <Stack.Screen name='Cart' component={Cart} 
          options={({ navigation }) => ({
            title: 'My cart',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation}/>,
          })} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    height: 160, // Set the height of the header
    // paddingHorizontal: 16, // Add padding if needed
    backgroundColor: '#2A4BA0', // Set the background color
  },
  headerSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // height: 160, // Set the height of the header
    padding: 26, // Add padding if needed
    // backgroundColor: '#2A4BA0', // Set the background color
  },
 
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
 
});


export default App;
