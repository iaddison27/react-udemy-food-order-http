import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        nameIsValid: true,
        streetIsValid: true,
        postalIsValid: true,
        cityIsValid: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const validateMandatoryField = (val) => {
        return val.trim().length > 0;
    };

    const validatePostcode = (val) => {
        return val.trim().length === 5;
    };

    const confirmOrderHandler = (event) => {
        event.preventDefault();

        const nameIsValid = validateMandatoryField(nameInputRef.current.value);
        const streetIsValid = validateMandatoryField(streetInputRef.current.value);
        const cityIsValid = validateMandatoryField(cityInputRef.current.value);
        const postalIsValid = validateMandatoryField(postalInputRef.current.value) && validatePostcode(postalInputRef.current.value);

        setFormValidity({
            nameIsValid,
            streetIsValid,
            postalIsValid,
            cityIsValid
        });

        if (!(nameIsValid && streetIsValid && cityIsValid && postalIsValid)) {
            return;
        }

        const userDetails = {
            name: nameInputRef.current.value,
            street: streetInputRef.current.value,
            postal: postalInputRef.current.value,
            city: cityInputRef.current.value
        };
        props.onSubmit(userDetails);
    };

    return (
        <form className={classes.form} onSubmit={confirmOrderHandler}>
            <div className={`${classes.control} ${formValidity.nameIsValid ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formValidity.nameIsValid && <p>Please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${formValidity.streetIsValid ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}  />
                {!formValidity.streetIsValid && <p>Please enter a valid street</p>}
            </div>
            <div className={`${classes.control} ${formValidity.postalIsValid ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef}  />
                {!formValidity.postalIsValid && <p>Please enter a valid postcode</p>}
            </div>
            <div className={`${classes.control} ${formValidity.cityIsValid ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}  />
                {!formValidity.cityIsValid && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
