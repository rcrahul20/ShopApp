import React, { useState,createContext,useEffect } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import ProductScreen from './ProductScreen';
import { MyContext } from './MyContext';
//   import AntDesign from '@expo/vector-icons/AntDesign';


  const MainScreen = () => {
    const [value, setValue] = useState(null);
    const [products, setProducts] = useState(null);
    const [text, setText] = useState("");

    useEffect(()=>{
      fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then((json) => {
            console.log("productsList",json)
            let category = json.map((cat,index)=>{
                return  { label: cat, value: index }

            });
            console.log("category",category)
            setProducts(category);
        })                   
    },[])

    return (
        <MyContext.Provider value={{ products, setProducts }}>
         <ProductScreen />
        </MyContext.Provider>
   
    );
  };

  export default MainScreen;

  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
  });
// MainScreen.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const MainScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Main Screen</Text>
//       {/* You should render other components or UI elements here */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height:'100%',
//     width:'100%',

//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red',
//   },
//   // Other styles...
// });

// export default MainScreen;
