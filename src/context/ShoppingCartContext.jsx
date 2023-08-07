import { useState, createContext, useContext } from "react";

const ShoppingCartContext = createContext({});

// function to access the ShoppingCartContext state...
export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

// component that acts as the wrapper (or the Provider of the ShoppingCartContext)...
export function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0;   // returns the first item which satisfies the condition in the array, and if there is the presence of that item in the array it returns the quantity, else returns 0 rather than undefined...
    }

    function setItemQuantity(id, qty) {
        // const currentID = +id;
        console.log("Im being called...");
        setCartItems(currentItems => {
            if(!currentItems.some(item => item.id == id)) {
                return [
                    ...currentItems,
                    {
                        id: +id,
                        quantity: parseInt(qty)
                    }
                ]
            } else {
                return currentItems.map(item => {
                    if (item.id == id) {
                        return {
                            ...item,
                            quantity: parseInt(qty),    // we get the value from the input field as String, so parsing it to Int...
                        }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function increaseQuantity(id) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [
                    ...currentItems,
                    {
                        id: +id,
                        quantity: 1
                    }
                ]
            } else {
              return currentItems.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseQuantity(id) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id);
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function removeQuantity(id) {
        console.log("removed...")
        setCartItems(currentItems => (
            currentItems.filter(item => item.id !== id)
        ))
    }

    // console.log(cartItems);

    return (
        <ShoppingCartContext.Provider value={
            {
                cartItems,
                getItemQuantity,
                setItemQuantity,
                increaseQuantity,
                decreaseQuantity,
                removeQuantity
            }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}