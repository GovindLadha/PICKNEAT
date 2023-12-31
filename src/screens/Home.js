import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCategory(response[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
          <div className="carousel-inner" id='carsouelm'>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="Burger" />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="Pizza" />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?pasta" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="Pasta" />
            </div>
            <div className="carousel-caption" style={{ zIndex: '1' }}>
              <div className="d-flex justify-content-center" >
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-secondary btn-light" type="submit">Search</button> */}
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodCategory.length !== 0 ? (
          foodCategory.map((data) => (
            <div key={data._id} className='row mb-3'>
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {foodItem.length !== 0 ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems => (
                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                  <Card
                    foodItem={filterItems}
                    options={filterItems.options[0]}
                  />
                </div>
              )) : (
                <div>No such data found</div>
              )}
            </div>
          ))
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
