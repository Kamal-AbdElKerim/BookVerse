import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './Home.css'
import Loading from "../Global_Style/londing/londing";
import TrendingBooks from "../TrendingBooks/TrendingBooks";
import { Link } from 'react-router-dom';




export default function Home() {
  const [Books, setBooks] = useState('');
  const [search, setSearch] = useState('');
  

  const AllBooks = async () =>  {

    let url ;
    if(search){
      url = `https://api.itbook.store/1.0/search/${search}`;
    }else{
      url = `https://api.itbook.store/1.0/new`;
    }
     
      axios.get(`${url}`)
      .then(function (response) {
        // handle success
        console.log(response.data.books);

        setBooks(response.data.books)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    
             
  }   
  
  useEffect(() => {
      
    AllBooks()
  }, []);

  const changeInput = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AllBooks();
  };

  return (


    <>
      {/* {loading ? <Loading /> : ''} */}
    <TrendingBooks />
      {/* Start Category */}
      <section className="category-page section">
        <div className="container">
        <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h2 className="wow fadeInUp" data-wow-delay=".4s">
              Books
            </h2>
            <p className="wow fadeInUp" data-wow-delay=".6s">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <div className="category-sidebar">
                {/* Start Single Widget */}
                <div className="single-widget search">
                  <h3>Search Ads</h3>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Search Here..."
                      value={search}
                      onChange={changeInput}
                    />
                    <button type="submit">
                      <i className="lni lni-search-alt" />
                    </button>
                  </form>
                </div>
                {/* End Single Widget */}

              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className="category-grid-list">
                <div className="row">
                  <div className="col-12">
                    <div className="category-grid-topbar">
                      <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-12">
                          <h3 className="title">Showing 1-12 of 21 ads found</h3>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                          <nav>
                            <div
                              className="nav nav-tabs"
                              id="nav-tab"
                              role="tablist"
                            >
                              <button
                                className="nav-link active"
                                id="nav-grid-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-grid"
                                type="button"
                                role="tab"
                                aria-controls="nav-grid"
                                aria-selected="true"
                              >
                                <i className="lni lni-grid-alt" />
                              </button>

                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-grid"
                        role="tabpanel"
                        aria-labelledby="nav-grid-tab"
                      >
                        <div className="row">
                          {Books && Books.map((book) => (

                          <div className="col-lg-4 col-md-6 col-12">
                            {/* Start Single Item */}
                            <div className="single-item-grid">
                              <div className="image">
                              <Link to={`/More/Info/${book.isbn13}`}><img src={book.image} alt="#" /></Link>

                                <i className=" cross-badge lni lni-bolt" />
                                <span className="flat-badge sale">Sale</span>
                              </div>
                              <div className="content">
                               
                                <h3 className="title">
                                <Link to={`/More/Info/${book.isbn13}`}>{book.title}</Link>
                                </h3>
                                <p className="location">
                                  <a href="javascript:void(0)">
                                  {book.subtitle}
                                  </a>
                                </p>
                                <ul className="info">
                                  <li className="price">{book.price}</li>
                                  <li className="like">
                                    <a href="javascript:void(0)">
                                      <i className="lni lni-heart" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* End Single Item */}
                          </div>
                          ))}

                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Category */}
    </>



  );
}
