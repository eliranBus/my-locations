import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import GlobalStyles from './global';
import { ToastProvider } from 'react-toast-notifications';
import categoriesList from './assets/categories';
import Categories from './components/Categories';
import AddCategory from './components/AddCategory';
import Category from './components/Category';
import Header from './components/Header';

export function saveLocalStorageCategories(newCategories) {
  localStorage.setItem('categories', JSON.stringify(newCategories));
}

export function getLocalStorageCategories() {
  const localStorageCategories = localStorage.getItem('categories');
  return localStorageCategories ? JSON.parse(localStorageCategories) : categoriesList;
}

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div className="App">
          <Router basename="/">
            <Header />
            <Switch>
              <Route exact path="/">
                <Categories />
              </Route>
              <Route path="/categories/:category">
                <Category />
              </Route>
              <Route path="/add-category">
                <AddCategory />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
