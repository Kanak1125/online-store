import { useShoppingCart } from '../context/ShoppingCartContext';

const Ping = () => {
  const {cartItems} = useShoppingCart();
    console.log(cartItems);
    const totalCartQuantity = cartItems.reduce((acc, currentItem) => {
        return acc + currentItem.quantity;
    }, 0)
  return (
    <span className="absolute flex h-5 w-5 top-[-10px] right-[-10px]">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 bg-secondary text-sm font-medium items-center justify-center">{totalCartQuantity}</span>
    </span>
  )
}

export default Ping