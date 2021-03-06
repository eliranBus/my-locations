import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import locations from '../assets/locations';
import BackBtn from './BackBtn';
import Loader from './Loader';

export default function Category() {
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }, [])

  return (
      <div className="top-wrapper">
        <div className="locations-container">
          <ul>
          {
            loading && (
              <Loader />
            )
          }
          {
            !loading && locations.filter(location => location.category.toLowerCase() === category) && (
          locations.filter(location => location.category.toLowerCase() === category).map(location => (
                <li key={locations.indexOf(location)}>
                  <div>
                    <h2>{location.name}</h2>
                    <p><b>address:</b> <br/>{location.address}</p>
                    <p><b>coordinates:</b> <br/>{location.coordinates}</p>
                    <p><b>category:</b> <br/>{location.category}</p>
                  </div>
              </li>
                )
              )
            ) 
          }
          {!loading && !locations.filter(location => location.category.toLowerCase() === category).length > 0 && (
              <h3>There are no locations found in this category</h3> 
          )}
          </ul>
        </div>
        <BackBtn/>
      </div>
  );
}
