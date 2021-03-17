const categoriesList = JSON.parse(localStorage.getItem('categories')) || localStorage.setItem('categories', JSON.stringify(
  [
    {
      name: 'Restaurants',
    },
    {
      name: 'Bars',
    },
    {
      name: 'Historical Sites',
    },
    {
      name: 'Museums',
    },
    {
      name: 'Parks',
    }
  ]
))

export default categoriesList