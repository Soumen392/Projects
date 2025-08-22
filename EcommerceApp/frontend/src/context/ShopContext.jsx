import React, { createContext, useState } from "react";   // 👈 useState import kiya
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 20;

    // States
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Ye value sabhi components ko milegi jo ShopContext use karenge
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
