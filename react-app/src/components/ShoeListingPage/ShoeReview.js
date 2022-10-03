import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom';
import { getApparelThunk } from '../../store/apparel';
import { createListingsThunk } from '../../store/listings';


function ShoeListingForm() {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    // const history = useHistory()
    const { shoeId, space, sizeId } = useParams();



    const [errors, setErrors] = useState([]);
    const [size, setSize] = useState(sizeId);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);

    const user = useSelector(state => state.session.user);

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = { size, price, quantity }
        dispatch(createListingsThunk(shoeId, payload))


    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Size</label>
                <input
                    type='text'
                    name='size'
                    onChange={e => setSize(e.target.value)}
                    value={size}
                ></input>
            </div>
            <div>
                <label>Price</label>
                <input
                    type='text'
                    name='price'
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                ></input>
            </div>
            <button type='submit'>Create Listing</button>
        </form>
    );
}

export default ShoeListingForm;