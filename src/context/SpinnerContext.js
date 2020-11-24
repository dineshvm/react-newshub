import React, { createContext, useState } from 'react';

export const SpinnerContext = createContext();


const SpinnerContextProvider = (props) => {
    const [isSpinnerOn, setSpinner] = useState(false)

    return (
        <SpinnerContext.Provider value={{ isSpinnerOn, setSpinner }}>
            {props.children}
        </SpinnerContext.Provider>
    )
}

export default SpinnerContextProvider