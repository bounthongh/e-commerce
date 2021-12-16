import React from "react";
import Catalog from "./Catalog";


export default function HomeView({cart, setCart}) {
    return (
        <>
            <Catalog cart={cart} setCart={setCart} />
        </>
    )
}; 