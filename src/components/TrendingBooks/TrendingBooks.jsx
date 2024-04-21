import React, { useEffect, useState } from 'react'
import './TrendingBooks.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TrendingBooks() {
    const [TrendingBooks, setTrendingBooks] = useState('');

    const RandomBooks = async () =>  {
       
        axios.get('https://api.itbook.store/1.0/search/mongodb')
        .then(function (response) {
          // handle success
          // console.log(response.data.books);
          const firstFiveBooks = response.data.books.slice(0, 8); 
console.log(firstFiveBooks)
          setTrendingBooks(firstFiveBooks)
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
        
        RandomBooks()
    }, []);


  return (
    <>
  {/* Start Items Tab Area */}
  <section className="items-tab section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h2 className="wow fadeInUp" data-wow-delay=".4s">
              Trending books
            </h2>
            <p className="wow fadeInUp" data-wow-delay=".6s">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              
           
              <button className="nav-link active" id="nav-random-tab" data-bs-toggle="tab" data-bs-target="#nav-random" type="button" role="tab" aria-controls="nav-random" aria-selected="false"
              >
                Random Ads
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">


            {/* start Random Ads */}
            <div
              className="tab-pane fade active show"
              id="nav-random"
              role="tabpanel"
              aria-labelledby="nav-random-tab"
            >
              <div className="row">
                {TrendingBooks && TrendingBooks.map((TrendingBook) => (
                  
                  <div className="col-lg-3 col-md-4 col-12">
                  {/* {console.log(TrendingBook.volumeInfo.imageLinks.thumbnail)} */}
                  {/* Start Single Item */}
                  <div className="single-item-grid">
                    <div className="image">
                      <Link to={`/More/Info/${TrendingBook.isbn13}`}><img src={TrendingBook.image} alt="#" /></Link>
                    
                      <i className=" cross-badge lni lni-bolt" />
                      <span className="flat-badge sale">Sale</span>
                    </div>
                    <div className="content">
                      <a href="javascript:void(0)" className="tag">

                      </a>
                      <h3 className="title">
                      <Link to={`/More/Info/${TrendingBook.isbn13}`}>{TrendingBook.title}</Link>
                      </h3>
                      <p className="location">
                        <a href="javascript:void(0)">
                         {TrendingBook.subtitle}
                        </a>
                      </p>
                      <ul className="info">
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

             {/* end Random Ads */}

          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End Items Tab Area */}
</>

  )
}
