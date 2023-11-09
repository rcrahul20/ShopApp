import React, {createContext, useState} from 'react';

import { getProduct } from './services/ProductsService.js';

export const CartContext = createContext();

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [isLogin, setLogin] = useState(false);

  function addItemToCart(itemList) {
    // const product = getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id == itemList?.id));
      if(!item) {
          return [...prevItems, {
              id:itemList.id,
              qty: 1,
              itemList,
              totalPrice: itemList.price 
          }];
      }
      else { 
          return prevItems.map((item) => {
            if(item.id == itemList?.id) {
              item.qty++;
              item.totalPrice += itemList.price;
            }
            return item;
          });
      }
    });

  }

  function removeItemToCart(itemList) {
    // const product = getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id == itemList?.id));
     
          return prevItems.filter((item) => {
           
            return item.id != itemList?.id;
          });
      
    });

  }


  function getItemsCount() {
      return items.reduce((sum, item) => (sum + item.qty), 0);
  }
  
  function getTotalPrice() {
      return items.reduce((sum, item) => (sum + item.totalPrice), 0);
  }  
  
  return (
    <CartContext.Provider 
      value={{items,isLogin,setLogin, setItems, getItemsCount, addItemToCart, getTotalPrice,removeItemToCart}}>
      {props.children}
    </CartContext.Provider>
  );
}

