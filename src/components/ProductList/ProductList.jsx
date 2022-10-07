import React, { useState } from 'react';
import './productlist.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';


const products = [
  { id: '1', title: 'Куртка', description: 'Цвет синий', price: 5000 },
  { id: '2', title: 'Куртка', description: 'Цвет красный', price: 12000 },
  { id: '3', title: 'Куртка', description: 'Цвет желтый', price: 7000 },
  { id: '4', title: 'Джинсы', description: 'Цвет синий', price: 5000 },
  { id: '5', title: 'Джинсы', description: 'Цвет синий', price: 6000 },
  { id: '6', title: 'Джинсы', description: 'Цвет черный', price: 5000 },
  { id: '7', title: 'Джинсы', description: 'Цвет черный', price: 4000 },
  { id: '8', title: 'Куртка', description: 'Цвет синий', price: 12000 },
];

const getTotalPrice = (items = []) => {
  return items.reduce((summ, item) => {
    return item.price + summ
  }, 0);
}

const ProductList = () => {

  const [addedItems, setAddedItems] = useState([]);

  const { tg } = useTelegram();

  const onAdd = (product) => {
    const allreadyAdded = addedItems.find(item => {
      item.id === product.id;
    });

    let newItem = [];

    if (allreadyAdded) {
      newItem = addedItems.filter(item => {
        item.id !== product.id;
      });
    } else {
      newItem = [...addedItems, product];
    }

    setAddedItems(newItem);

    if (newItem.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItem)}`
      });
    }

  }

  return (
    <div className="list">
      {products.map(item => (<ProductItem product={item} className={"item"} onAdd={onAdd} />))}
    </div>
  )
}

export default ProductList;
