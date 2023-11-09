import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MyContext } from './MyContext';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const CartScreen = () => {
  const [value, setValue] = useState(null);
  const { products } = useContext(MyContext);
  const [productsList, setProductsList] = useState([]);
  const colorScheme = useColorScheme(); // Get the current color scheme (light/dark)

  // Define text color based on the theme
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  // Fetch products based on the selected category
  const getProductList = (category) => {
    fetch('https://dummyjson.com/products/category/' + category)
      .then(res => res.json())
      .then((json) => {
        console.log("json?.products", json?.products);

        setProductsList(json?.products);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  const renderItemList = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onCheck(item.id)} style={styles.rowList}>
        <Text style={styles.textItem}>{item?.brand}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={[styles.textItem, { color: textColor }]}>{item.label}</Text>
      </View>
    );
  };

  return (
    products?.length > 0 ? (
      <View style={styles.container}>
        <Text style={{color:'red',fontSize:20}}>{'Select Category'}</Text>
        <Dropdown
          style={styles.dropdown}
          data={products}
          labelField="label"
          valueField="value"
          placeholder="category"
          containerStyle={{backgroundColor:'grey'}}
          value={value}
          onChange={(item) => {
            setValue(item?.value);
            getProductList(item?.label);
          }}
          renderItem={renderItem}
        />
        {productsList?.length > 0 ? (
        <><Text style={{color:'red',fontSize:20,marginTop:20}}>{'Select Product'}</Text>
        <FlatList
            style={styles.containerList}
            data={productsList}
            renderItem={renderItemList}
            contentContainerStyle={styles.listContent}
          />
          </>
        ) : null}
      </View>
    ) : null
  );
};

const styles = StyleSheet.create({
  container: {
   height:'100%',width:'100%',
    padding: 16,
  },
  containerList: {
    flex: 1,
  },
  rowList: {
    padding: 1,
    marginBottom: 10,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItem: {
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor:'grey'
  },
  listContent: {
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default CartScreen;
