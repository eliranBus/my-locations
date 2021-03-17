import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageCategories } from '../App';
import changeIndex from '../redux/actions/indexActions';
import {List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { useStyles } from '../assets/styles/categoriesStyles'; 
import RoomIcon from '@material-ui/icons/Room';

const storageCategories = getLocalStorageCategories();

export default function Categories() {
  const classes = useStyles();
  const index = useSelector((state) => state.index.index);
  const dispatch = useDispatch();

  const handleListItemClick = (newIndex) => {
    newIndex === index ? 
    dispatch(changeIndex(undefined)) : 
    dispatch(changeIndex(newIndex))
  };

  return (
    <div className="categories-container">
      <div className={classes.root}>
        <List component="nav" aria-label="categories" style={{maxHeight: '75vh', overflow: 'auto'}}>
          {
          storageCategories && storageCategories.length > 0 ?
          storageCategories.map(category => (
            <div key={storageCategories.indexOf(category)}>
              <ListItem
                button
                selected={index === storageCategories.indexOf(category)}
                onClick={() => handleListItemClick(storageCategories.indexOf(category))}
              >
                <ListItemIcon>
                  <RoomIcon />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
              <Divider />
            </div>
            ))
          :
          <h3><b>There are no categories available</b></h3>

          }
        </List>
      </div>
    </div>
  );
}
