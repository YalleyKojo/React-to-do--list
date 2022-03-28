
import './index.css'
import Header from './Header'
import SearchItem from './SearchItem';
import AddItems from './AddItems';
import Content from './Content'
import Footer from './Footer';
import { useState, useEffect } from 'react'
import apirequest from './API_REQ';

function App() {

  const API_URL = "http://localhost:3500/items" 
  
   const [items, setItems] = useState( []);
  
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [isloading, setIsloading] = useState(true)
  const [errormessage,setErrorMessage]=useState(null)

 
  
  useEffect(() => {

    const fetchdata = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response) throw Error("NO response from server")
        const listitems = await response.json()
        setItems(listitems)
      }
      catch (error) {
        setErrorMessage(error);
        
      }
      finally {
        setIsloading(false)
        
      }
      
      
    }

     fetchdata()
     

    
  } , [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
    
    const addoptions = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(myNewItem)
    }
    const result = await apirequest(API_URL, addoptions);
    if (!result) setErrorMessage(result);
  }

  const handlecheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id)
    
    
    const UpdateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
        
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const response= await apirequest(`${API_URL}/${id}`,UpdateOptions)
    if(!response) setErrorMessage(response)
  }
  const handleDelete =async (id) => {
   const listItems = items.filter((item) => item.id !== id)
    setItems(listItems);
    
    const deleteoptions = { method: 'DELETE' }
     const response= await apirequest(`${API_URL}/${id}`,deleteoptions)
    if(!response) setErrorMessage(response)
    
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
    
  }

  return (
    <div className='App'>
    
      <Header  />
      <AddItems
        newItem={newItem}
        handleSubmit={handleSubmit}
        setNewItem={setNewItem}
      />
      < SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handlecheck={handlecheck}
        handleDelete={handleDelete}/>
      <Footer
        length={items.length}/>
    
    </div>
    
    
  );
}

export default App;
