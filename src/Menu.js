import React, { useState, useEffect } from "react";
import { ref, set } from "firebase/database"; 
import { onAuthStateChanged } from "firebase/auth"; 
import { database, auth } from "./firebase"; 
import "./Menu.css";
import Navbar from "./Navbar";

const Menu = () => {
  const menuItems = [
    { id: 1, name: "Margherita Pizza", price: 12, image: "https://simplyhomecooked.com/wp-content/uploads/2023/04/Margherita-Pizza-3.jpg" },
    { id: 2, name: "Caesar Salad", price: 8, image: "https://www.cuisinart.com/dw/image/v2/ABAF_PRD/on/demandware.static/-/Sites-us-cuisinart-sfra-Library/default/dwaf030910/images/recipe-Images/classic-caesar-salad-recipe.jpg?sw=1200&sh=1200&sm=fit" },
    { id: 3, name: "Grilled Chicken", price: 15, image: "https://www.thecookierookie.com/wp-content/uploads/2022/08/Featured-Grilled-BBQ-Chicken-1.jpg" },
    { id: 4, name: "Pasta Alfredo", price: 10, image: "https://i.ytimg.com/vi/iQ38VKAjQgo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBYeSca3xOzPVWec6G-I6XqaZ8z4Q" },
    { id: 5, name: "Sushi Platter", price: 18, image: "https://images.stockcake.com/public/1/a/9/1a9ed6c9-f4f2-4f45-b24c-53f61da694e1_large/sushi-platter-served-stockcake.jpg" },
    { id: 6, name: "Chocolate Cake", price: 6, image: "https://fromthelarder.co.uk/wp-content/uploads/2021/04/GF-Chocolate-Cake.jpg" },
    { id: 7, name: "Burger", price: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV56HBwj_ViD3qNykb3HT83D7931pxC5arwg&s" },
    { id: 8, name: "Paneer Biryani", price: 14, image: "https://kitchenmai.com/wp-content/uploads/2020/07/paneer_bir_blog.jpg" },
    { id: 9, name: "Fish and Chips", price: 13, image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/air_fryer_fish_and_chips_69021_16x9.jpg" },
    { id: 10, name: "Vegetable Stir-fry", price: 9, image: "https://playswellwithbutter.com/wp-content/uploads/2022/02/Beef-and-Vegetable-Stir-Fry-16.jpg" },
    { id: 11, name: "Cobb Salad", price: 20, image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Cobb-Salad-main.jpg" },
    { id: 12, name: "Ice Cream Sundae", price: 7, image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/sundaes1-528146c.jpg" },
  ];

  const [cart, setCart] = useState({});
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); 
      } else {
        setUserId(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleQuantityChange = (id, type) => {
    const updatedCart = { ...cart };
    const currentQuantity = updatedCart[id] || 0;
    if (type === "increase") {
      updatedCart[id] = currentQuantity + 1;
    } else if (type === "decrease" && currentQuantity > 0) {
      updatedCart[id] = currentQuantity - 1;
    }
    setCart(updatedCart);
  };

  const handleAddToCart = async (item) => {
    if (!userId) {
      
      alert("Please log in to add items to the cart.");
      return;
    }

    const quantity = cart[item.id] || 0;
    if (quantity > 0) {
      const cartItem = {
        name: item.name,
        price: item.price,
        quantity: quantity,
        totalPrice: item.price * quantity,
        image: item.image,
      };

      try {
        
        const cartRef = ref(database, `users/${userId}/cart/${item.id}`);
        await set(cartRef, cartItem);

        alert(`Item added to cart:\n${cartItem.name}\nQuantity: ${cartItem.quantity}\nTotal Price: $${cartItem.totalPrice}`);
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add item to cart. Please try again.");
      }
    } else {
      alert(`Please add at least one ${item.name} to the cart.`);
    }
  };

  return (
    <><Navbar/>
    <div className="menu-page">
      <h2>Our Menu</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div className="menu-card" key={item.id}>
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p>{`$${item.price}`}</p>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, "decrease")}>-</button>
              <span>{cart[item.id] || 0}</span>
              <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, "increase")}>+</button>
            </div>
            <button className="menu-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Menu;
