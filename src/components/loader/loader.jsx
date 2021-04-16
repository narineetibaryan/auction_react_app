import React from 'react'
import './loader.css'

export const Loader = () => {
    return (
        <div id='loader_container'>
            <div className="lds-roller">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}