import React from 'react'
import Listitems from './Listitems'

const Content = ({ items, handlecheck, handleDelete }) => {
 

  return (
    

    <main>
      {items.length ? (
        <ul>
          {
            items.map((item) => (
              <Listitems
                item={item}
                handlecheck={handlecheck}
                handleDelete={handleDelete}
                
              />
              
            ))
          }


        </ul>) : (<p style={{ marginTop:'5rem' }}> Sorry there are no items in your list</p>)
      }

    
        
             
      </main>
      
    
      
  )
}

export default Content