// Packages and Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// Components
import Cart from ".//Cart/Cart";
import Layout from ".//Layout/Layout";
import Products from ".//Shop/Products";
import Notification from "./UI/Notification.js";
import Button from "../Button/Button.js";
import {
  sendCartData,
  fetchCartData,
} from "../../store/ReduxCartSlices/cart-actions.js";
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      <Button />
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
