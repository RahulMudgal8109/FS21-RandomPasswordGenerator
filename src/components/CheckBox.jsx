import React from 'react'

const CheckBox = (prop) => {
    return (
        <div>
            <input type="checkbox" onChange={prop.onChange} checked={prop.state}/>
            <label>{prop.title}</label>
        </div>
    )
}

export default CheckBox