import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MyContext } from './MyContext';
import { useNavigation } from '@react-navigation/native';

const sortData = [
  { label: 'price High to Low', value: '1' },
  { label: 'price Low to High', value: '2' },
  { label: 'rating High to Low', value: '3' },
  { label: 'rating Low to High', value: '4' },
  { label: 'Normal', value: '5' },


];

const ProductScreen = () => {
  const [value, setValue] = useState(null);
  
  const [sortValue, setSortValue] = useState(null);

  const { products } = useContext(MyContext);
  const [productsList, setProductsList] = useState([]);
  const colorScheme = useColorScheme(); // Get the current color scheme (light/dark)
  const navigation = useNavigation();

  // Define text color based on the theme
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  // Fetch products based on the selected category
  const getProductList = (category) => {
    console.log("json?.category", category);
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
    //   <TouchableOpacity onPress={() => onCheck(item.id)} style={styles.rowList}>
    //     <Text style={styles.textItem}>{item?.brand}</Text>
    //   </TouchableOpacity>
    <TouchableOpacity onPress={()=>{ navigation.navigate('ProductDetails', {
        productId: 100,
        item,item
      })}}  style={styles.rowList}>
    <Image source={{ uri: item.thumbnail }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.brand}>brand:{item.brand}</Text>
      <Text style={styles.brand}>price:{item.price}</Text>
      <Text style={styles.brand}>rating:{item.rating}</Text>

    </View>
  </TouchableOpacity>
    );
  };

  function sortProduct(item){
   let sortedProducts = item?.value == 1 ? productsList.sort((a, b) => b.price - a.price):
   item?.value == 2?productsList.sort((a, b) => a.price - b.price):
   item?.value == 3?productsList.sort((a, b) => a.rating - b.rating):
   item?.value == 4?productsList.sort((a, b) => b.rating - a.rating): [];
    if(item?.value == 5){
    getProductList(value?.label)
    return 
    }
     setProductsList(sortedProducts);


  }

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={[styles.textItem, { color: 'white' }]}>{item.label}</Text>
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
          placeholder="select category"
          containerStyle={{backgroundColor:'brown',padding:10}}
          value={value?.value}
          onChange={(item) => {
            setValue(item);
            getProductList(item?.label);
          }}
          renderItem={renderItem}
        />
        {productsList?.length > 0 ? (
        <View style={{ height:'100%',width:'100%'}}>
        <Text style={{color:'red',fontSize:20,marginTop:20}}>{'Select Product'}</Text>
        <Dropdown
          style={styles.dropdownSort}
          data={sortData}
          labelField="label"
          valueField="value"
          placeholder="sort"
          containerStyle={{backgroundColor:'brown',padding:10}}
          value={value}
          onChange={(item) => {
            setSortValue(item?.value);
            sortProduct(item);
          }}
          renderItem={renderItem}
        />
      
        <FlatList
            style={styles.containerList}
            data={productsList}
            renderItem={renderItemList}
            contentContainerStyle={styles.listContent}
          />
          </View>
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
    height:'100%',width:'100%',
},
//   rowList: {
//     padding: 1,
//     marginBottom: 10,
//     backgroundColor: 'skyblue',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
  rowList: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  brand: {
    fontSize: 14,
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
    backgroundColor:'brown'
  },
  dropdownSort: {
    height: 40,
    width:180,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor:'brown'
  },
  listContent: {
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor:'brown'

  },
});

export default ProductScreen;
