import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { deleteApparelThunk, getApparelThunk } from '../../store/apparel';
import { getAllListingsThunk } from '../../store/listings';
import { getAllPurchasesThunk } from '../../store/purchase';
import { searchAllApparelThunk } from '../../store/searchbar';
import PriceChart from './priceChart';
import './ShoeProfilePage.css'
import Footer from '../footer';

function ShoeProfilePage() {
    const dispatch = useDispatch()
    // const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(false)
    // const history = useHistory()
    const { shoeId } = useParams();
    const history = useHistory()

    const shoeInfo = useSelector(state => Object.values(state.apparel))
    const shoeListings = useSelector(state => Object.values(state.listings))
    const shoePurchases = useSelector(state => Object.values(state.purchase))
    // console.log(shoeInfo[0].brand)

    useEffect(() => {
        dispatch(getApparelThunk(shoeId))
        dispatch(getAllListingsThunk())
        dispatch(getAllPurchasesThunk())
        dispatch(searchAllApparelThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch, shoeId])



    // let relatedBrands = shoeListings.filter(shoe => (shoe.apparelBrandType) === shoeInfo[0]?.brandType).slice(0, 5).map(item => {
    //     return (
    //         <>
    //             <div className='mainpage-shoe-containers'>
    //                 <div className='mainpage-shoe-listing-image-container'>
    //                     <NavLink to={`/shoe/${item.apparelId}`}>
    //                         <img src={item.apparelImg} className='mainpage-shoe-listing-image' alt="profile"></img>
    //                     </NavLink>
    //                 </div>
    //                 <div className='mainpage-shoe-text-container'>
    //                     <div className='mainpage-shoe-name'>
    //                         {item.apparelName}
    //                     </div>
    //                     <div>
    //                         <div className='mainpage-shoe-lowest-ask'>lowest ask</div>
    //                         <strong><div className='mainpage-shoe-lowest-price'>${item.price}</div></strong>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // })

    let newArr = [];
    const relatedBrands = shoeListings.map((item) => {
        const { apparelBrandType, price, apparelId, apparelName, apparelImg, apparelColorway } = item


        if ((apparelBrandType === shoeInfo[0]?.brandType)) {
            if (!newArr.includes(apparelColorway) && (apparelColorway !== shoeInfo[0]?.colorway)) {
                newArr.push(apparelColorway)

                return (
                    <>
                        <NavLink to={`/shoe/${apparelId}`} style={{ textDecoration: 'none' }}>
                            <div className='mainpage-shoe-containers'>
                                <div className='mainpage-shoe-listing-image-container'>

                                    <img src={apparelImg} className='mainpage-shoe-listing-image' alt="profile"></img>

                                </div>
                                <div className='mainpage-shoe-text-container'>
                                    <div className='mainpage-shoe-name'>
                                        {apparelName}
                                    </div>
                                    <div>
                                        <div className='mainpage-shoe-lowest-ask'>highest ask</div>
                                        <strong><div className='mainpage-shoe-lowest-price'>${price}</div></strong>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </>
                )
            }
        }
        return
    })

    // console.log(relatedBrands)

    let priceArr = []
    let salesArr = []
    shoePurchases.map(item => {

        const { apparelId } = item
        // const itemArr = Object.values(item)
        // console.log(apparelId, listingPrice)
        // console.log(apparelId, shoeId)
        if (apparelId === Number(shoeId)) {
            priceArr.push(item.listingPrice)
            salesArr.push(item.length)
        }

    })


    let minPrice = Math.min(...priceArr)
    let maxPrice = Math.max(...priceArr)
    let totalSales = salesArr.length
    let total = 0
    priceArr.forEach(item => {
        total += item
    })
    let average = total / priceArr.length
    let premium = Math.abs((shoeInfo[0]?.retailPrice / average) * 100 - 100)



    const shoePage = shoeInfo.map((shoe) => {

        const { brand, brandType, colorway, condition, description, id, imageUrl, name, retailPrice, releaseDate, listings } = shoe

        let allListings
        if (listings.length > 25) {
            allListings = (
                <div style={{ marginLeft: '8px' }}>
                    This shoe is Hot right now!!!
                    {/* There are currently {listings.length} available listings */}
                </div>
            )
        } else if (listings.length < 24 && listings.length >= 1) {
            allListings = (
                <div style={{ marginLeft: '8px' }}>
                    Only a few listings left for this shoe!
                    {/* Only {listings.length} available listings for this shoe!!! */}
                </div>
            )
        } else {
            allListings = (
                <div style={{ marginLeft: '8px' }}>
                    No available listings for this shoe
                </div>
            )
        }

        let topContainer = (
            <>
                <div className='shoe-profile-top-container'>
                    <div className='shoe-profile-top-left-container'>
                        <div className='shoe-profile-url-header'>
                            Home / Sneakers / {brand} / {brandType} / {name}
                        </div>
                        <div className='shoe-profile-title'>
                            {name}
                        </div>
                        <div className='shoe-profile-colorway'>
                            {colorway}
                        </div>
                        <div className='shoe-profile-condition'>
                            Condition: {<div style={{ color: 'green', marginLeft: '3px' }}>{condition}</div>}
                        </div>
                        <div className='shoe-profile-image-container'>
                            <img src={imageUrl} alt="shoe" className='shoe-profile-image' ></img>
                        </div>
                    </div>
                    <div className='shoe-profile-top-right-container'>
                        <div className='shoe-profile-top-right-body-container'>
                            <i class="fa-solid fa-fire" style={{ color: 'rgba(255, 111, 0, 0.937)' }}></i>
                            {allListings}
                        </div>
                        <div className='shoe-profile-top-right-body'>
                            <div>
                                <NavLink to={`/shoe/${id}/buy`}>
                                    <button className='shoe-profile-buy-button'> Buy</button>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to={`/shoe/${id}/sell`}>
                                    <button className='shoe-profile-sell-button'> Sell</button>
                                </NavLink>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )


        // console.log('HELLO',relatedBrands.length)

        let relatedProducts = (
            <div className='shoe-profile-related-products-container'>
                <div style={{ marginBottom: '5px', fontWeight: '600' }}>
                    Related Products:
                </div>
                <div className='shoe-profile-related-products' >
                    {relatedBrands}
                </div>
            </div>
        )


        let productDetails = (
            <div className='shoe-profile-product-details-container'>
                <div style={{ marginBottom: '30px', fontWeight: '600' }}>
                    Product Details:
                </div>
                <div className='shoe-profile-product-body-container'>
                    <div className='shoe-profile-product-body-left-container'>
                        <div className='shoe-profile-product-body-left-left-container'>
                            <div>
                                Colorway
                            </div>
                            <div>
                                Retail Price
                            </div>
                            <div>
                                Release Date
                            </div>
                        </div>
                        <div className='shoe-profile-product-body-left-right-container'>
                            <div>
                                {colorway}
                            </div>
                            <div>
                                ${retailPrice}
                            </div>
                            <div>
                                {releaseDate}
                            </div>
                        </div>
                    </div>
                    <div className='shoe-profile-product-body-right-container'>
                        <div style={{ marginBottom: '8px', fontWeight: '550' }}>
                            Product description
                        </div>
                        <div className='shoe-profile-product-description'>
                            {description}
                        </div>
                    </div>
                </div>

            </div>
        )

        let chartInfo = shoePurchases.filter(shoe => id === shoe.apparelId)
        // console.log(chartInfo)

        let priceHistory = (
            <div className='shoe-historical-stats' style={{ marginTop: '12px', fontWeight: '550' }}>
                Price history
                <div className='historical-shoe-chart'>
                    {chartInfo.length === 0 ? 'No purchases' : <PriceChart chartInfo={chartInfo} />}
                </div>
            </div>

        )

        let tradeRange
        if ((minPrice === maxPrice)) {
            tradeRange = (
                <div className='stat'>
                    ${minPrice}
                </div>
            )
        } else if (totalSales === 0) {
            tradeRange = (
                <div className='stat'>
                    0
                </div>
            )
        } else {
            tradeRange = (
                <div className='stat'>
                    ${minPrice} - ${maxPrice}
                </div>
            )
        }


        let historalStats = (
            <div className='shoe-profile-stats'>
                <div style={{ marginTop: '12px', fontWeight: '550' }}>
                    Historial stats:
                </div>

                <div className='shoe-profile-stats-box-container'>
                    <div className='shoe-profile-stats-box'>
                        <div className='shoe-profile-stats-spacing'>
                            {tradeRange}
                            <div className='stat-text'>
                                12-month Trade Range
                            </div>
                        </div>
                    </div>
                    <div className='shoe-profile-stats-box'>
                        <div className='shoe-profile-stats-spacing'>
                            <div className='stat'>
                                {tradeRange}
                            </div>
                            <div className='stat-text'>
                                All Time Trade Range
                            </div>
                        </div>
                    </div>
                    <div className='shoe-profile-stats-box'>
                        <div className='shoe-profile-stats-spacing'>
                            {totalSales === 0 ? <div className="stat"> 0% </div> : <div className='stat'> 1%</div>}
                            <div className='stat-text'>
                                Volatility
                            </div>
                        </div>
                    </div>
                    <div className='shoe-profile-stats-box'>
                        <div className='shoe-profile-stats-spacing'>
                            <div className='stat'>
                                {totalSales}
                            </div>
                            <div className='stat-text'>
                                Number of Sales
                            </div>
                        </div>
                    </div>
                    <div className='shoe-profile-stats-box'>
                        <div className='shoe-profile-stats-spacing'>
                            {totalSales === 0 ? <div className="stat"> 0% </div> : <div className='stat'> {Math.floor(premium)}% </div>}
                            <div className='stat-text'>
                                Price Premium
                            </div>
                        </div>
                    </div>
                    <div className='shoe-profile-stats-box'>
                        <div className='shoe-profile-stats-spacing'>
                            {totalSales === 0 ? <div className="stat"> 0% </div> : <div className='stat'> ${Math.floor(average)}</div>}
                            <div className='stat-text'>
                                Sales Average
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        )


        let deleteApparel
        if (listings.length === 0) {
            deleteApparel = (
                <div className='delete-apparel'>
                    <button className='delete-apparel-button' onClick={() => { dispatch(deleteApparelThunk(id)); history.push('/shoes') }}> Delete Product</button>
                </div>
            )

        }



        return isLoaded && (
            <div key={id} className='shoe-page-body'>
                <div>
                    {topContainer}
                </div>
                <div>
                    {relatedProducts}
                </div>
                <div>
                    {productDetails}
                </div>
                <div>
                    {priceHistory}
                </div>
                <div>
                    {historalStats}
                </div>
                <div>
                    {deleteApparel}
                </div>
            </div >
        )

    })




    return isLoaded && (
        <>
            <div className='navbar-spacing'>
                <div className='shoe-page-body-container'>
                    {shoePage}
                </div>
                <Footer />
            </div>
        </>
    );
}
export default ShoeProfilePage;
