import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";

export const mount = (element: HTMLElement | string) => {
    if (typeof element === 'string') {
        element = document.getElementById(element) as HTMLElement

        if (!element) {
            throw new Error(`Could not find element with id ${element}`)
        }
    }

    ReactDOM.createRoot(element).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
}
