import React, { createContext, useState } from 'react';

export const SpinnerContext = createContext();

/**
 * <SpinnerContextProvider> </SpinnerContextProvider> 
 * @description Provides the spinner context to the entire app
 * @param  {object} props consists children components which wrapped under provider
 */
const SpinnerContextProvider = (props) => {
    const [isSpinnerOn, setSpinner] = useState(false)

    return (
        <SpinnerContext.Provider value={{ isSpinnerOn, setSpinner }}>
            {props.children}
        </SpinnerContext.Provider>
    )
}

export default SpinnerContextProvider