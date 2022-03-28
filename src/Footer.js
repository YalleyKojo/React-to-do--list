import React from 'react'

const Footer = ({length}) => {
    const nnd3 = new Date();
     
    return (
        <footer>
            {length} List {length === 1 ? "item" : "items"} 
            <br/>
            Copyright  &copy; {nnd3.getFullYear()}
        </footer>
    )
}

export default Footer;