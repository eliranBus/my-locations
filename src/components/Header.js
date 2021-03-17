import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLocalStorageCategories, saveLocalStorageCategories } from '../App';
import swal from 'sweetalert';
import Toggle from './Toggle';
import { useToasts } from 'react-toast-notifications';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { useStyles } from '../assets/styles/headerStyles';

const storageCategories = getLocalStorageCategories();

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("Categories");
  const index = useSelector((state) => state.index.index);
  const { addToast } = useToasts();

  const addCategory = () => {
    history.push('/add-category');
    setTitle("Add a Category");
  }

  const showCategory = () => {
    history.push(`/categories/${storageCategories[index].name.toLowerCase()}`);
    setTitle(`${storageCategories[index].name} category`);
  }

  const editCategory = () => {
    let exists = false;
    setTitle("Edit a Category");
    swal("Edit the category's name to your desire:", {
      content: "input",
    })
    .then((value) => {
      if (!value || value === null || value === undefined){
        addToast('Please type a valid category name', { appearance: 'warning' });
        swal({title: 'Please type a valid category name', icon: "info"});
      } else {
          for(let i = 0; i < storageCategories.length; i++){
            if (storageCategories[i].name === value.charAt(0).toUpperCase() + value.slice(1)) {
              exists = true;
              swal({title: `Category name already exists`, icon: "info"});
              addToast(`Category name already exists`, { appearance: 'error' });
              setTitle("Categories");
          } 
        }
      }
      if (exists === false && value && value !== null && value !== undefined && value.length > 0) {
        swal("Category name changed to:", `${value.charAt(0).toUpperCase() + value.slice(1)}`, "success");
        storageCategories.push({name: value.charAt(0).toUpperCase() + value.slice(1)});
        storageCategories.splice(index, 1);
        saveLocalStorageCategories(storageCategories);
        setTitle("Categories");
        addToast('Category name successfully edited', { appearance: 'success' });
        setTimeout(() => {
          window.location.assign("/");
        }, 2000);
      } 
    });
  }

  const deleteCategory = () => {
    let removedCategory = storageCategories[index].name
    storageCategories.splice(index, 1);
    saveLocalStorageCategories(storageCategories);
    swal({
      title: "Are you sure you want to delete this category?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal(`Poof! Category "${removedCategory}" has been deleted!`, {
          icon: "success",
        });
        addToast(`Category "${removedCategory}" successfully removed`, { appearance: 'success' });
        setTimeout(() => {
          window.location.assign("/");
        }, 1500);
      } else {
        swal("Your category is safe!");
      }
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="MyLocations" onClick={() => window.location.assign("/")}>
            <RoomIcon />&nbsp;MyLocations
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title ? title : "Categories"}
          </Typography>
          {index === undefined ? 
            <Button color="inherit" onClick={addCategory}>New Category <RoomIcon /></Button>  
            : window.location.href.indexOf("categories") > -1 ?
            <div className="buttons">
              <Button color="inherit" onClick={editCategory}>Edit &#9998;</Button>
              <Button color="inherit" onClick={deleteCategory}>Delete &#128465;</Button>
            </div>
            :
              <div className="buttons">
              <Button color="inherit" onClick={editCategory}>Edit &#9998;</Button>
              <Button color="inherit" onClick={showCategory}>View &#128065;</Button>
              <Button color="inherit" onClick={deleteCategory}>Delete &#128465;</Button>
            </div>
          }
          <Toggle />
        </Toolbar>
      </AppBar>
    </div>
  );
}
