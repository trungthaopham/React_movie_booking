import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Footer from '../Components/Footer';
import Header from '../Components/Header';

// định nghĩa component để tái sử dụng 
export const HomeTemplate = (props) => {

    let { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <Header></Header>
            <Component {...propsRoute} />
            <Footer></Footer>
        </>
    }} />
}