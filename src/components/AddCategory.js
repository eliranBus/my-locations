import React, {useState, useRef, useEffect} from 'react';
import { getLocalStorageCategories, saveLocalStorageCategories } from '../App';
import { useToasts } from 'react-toast-notifications';
import Button from '@material-ui/core/Button';
import BackBtn from './BackBtn';

const storageCategories = getLocalStorageCategories();

export default function AddCategory() {
  const [catToAdd, setCatToAdd] = useState("");
  const { addToast } = useToasts();
  const input = useRef();

useEffect(() => {
  input.current.focus();
}, [])

  const addToCategories = (e) => {
    e.preventDefault();
    setCatToAdd("");
    let exists = false;
    if (!catToAdd || catToAdd === null || catToAdd === undefined){
      addToast('Please type a valid category name', { appearance: 'warning' });
      input.current.focus();
    } else {
      for(let i = 0; i < storageCategories.length; i++){
        if (storageCategories[i].name === catToAdd.charAt(0).toUpperCase() + catToAdd.slice(1)) {
          exists = true;
          addToast('Category already exists', { appearance: 'error' });
          input.current.focus();
        } 
      }
    }
    if (exists === false && catToAdd && catToAdd !== null && catToAdd !== undefined && catToAdd.length > 0) {
      addToast(`Category "${catToAdd}" successfully added`, { appearance: 'success' });
      storageCategories.push({name: catToAdd.charAt(0).toUpperCase() + catToAdd.slice(1)});
      saveLocalStorageCategories(storageCategories);
      input.current.focus();
    } 
  }

  return (
    <div className="form-container">
      <form onSubmit={addToCategories}>
        <input ref={input} type="text" placeholder="Category name" value={catToAdd} onChange={(e) => setCatToAdd(e.target.value)}/>
        <Button type="submit" variant="contained" color="primary">Add To Categories</Button>
      </form>
      <BackBtn/>
    </div>
  )
}

