import React, {useCallback, useContext, useState} from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
      setIsOrdering(true);
  }

  const submitOrderHandler = async(userData) => {
    setIsSubmitting(true);
    const response = await fetch('url', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      }),
    });
    // todo error handling
    setIsSubmitting(false);
    setSubmitSuccess(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
      </div>
  );

  const modalContent = (
      <React.Fragment>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isOrdering && <Checkout onClose={props.onClose} onSubmit={submitOrderHandler}/>}
        {!isOrdering && modalActions}
      </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data</p>;
  const successfulSubmissionModalContent =
      <React.Fragment>
        <p>Successfully sent order</p>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      </React.Fragment>;

  return (
    <Modal onClose={props.onClose}>
      {!submitSuccess && !isSubmitting && modalContent}
      {!submitSuccess && isSubmitting && isSubmittingModalContent}
      {submitSuccess && successfulSubmissionModalContent}
    </Modal>
  );
};

export default Cart;
