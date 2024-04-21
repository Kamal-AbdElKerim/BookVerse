import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './MoreInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MoreInfo() {
    const { id } = useParams();
    const [Book, setBook] = useState();

   const info = () => {
    axios.get(`https://api.itbook.store/1.0/books/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);

      setBook(response.data)
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
    
    info()
   }, []);

   const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const starIcons = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<FontAwesomeIcon icon={faStar} key={i} className="star-icon" />);
    }

    // Half star
    if (hasHalfStar) {
      starIcons.push(
        <FontAwesomeIcon icon={faStar} key="half-star" className="star-icon" style={{ width: '50%', overflow: 'hidden' }} />
      );
    }

    // Empty stars
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(
        <FontAwesomeIcon icon={faStar} key={`empty-star-${i}`} className="star-icon" style={{ opacity: 0.4 }} />
      );
    }

    return starIcons;
  };

  return (
    <>
  {/* Start Breadcrumbs */}
  <div className="breadcrumbs">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="breadcrumbs-content">
            <h1 className="page-title">Book Details</h1>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <ul className="breadcrumb-nav">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>Book Details</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* End Breadcrumbs */}
  {/* Start Item Details */}
  <section className="item-details section">
    <div className="container">
      <div className="top-area">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12">
            <div className="product-images">
              <main id="gallery">
                <div className="main-img">
                  <img
                    src={Book && Book.image}
                    id="current"
                    alt="#"
                  />
                </div>
               
              </main>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <div className="product-info">
              <h2 className="title">{Book && Book.title}</h2>
              <p className="location">
                {Book && renderStars(Book && Book.rating)}
              </p>
              <h3 className="price">{Book && Book.price}</h3>
              <div className="list-info">
                <h4>Informations</h4>
                <ul>
                  <li>
                    <span>Authors:</span> {Book && Book.authors}
                  </li>
                  <li>
                    <span>language:</span> {Book && Book.language}
                  </li>
                  <li>
                    <span>year:</span> {Book && Book.year}
                  </li>
                </ul>
              </div>
              <div className="contact-info">
                <ul>
                  <li>
                    <a href={Book && Book.pdf && Book.pdf['Chapter 1']} className="call">
                    <i class="fa-solid fa-download"></i>
                    Download pdf
                    </a>
                  </li>
                 
                </ul>
              </div>
              <div className="social-share">
                <h4>Share Ad</h4>
                <ul>
                  <li>
                    <a href="javascript:void(0)" className="facebook">
                      <i className="lni lni-facebook-filled" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="twitter">
                      <i className="lni lni-twitter-original" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="google">
                      <i className="lni lni-google" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="linkedin">
                      <i className="lni lni-linkedin-original" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="pinterest">
                      <i className="lni lni-pinterest" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="item-details-blocks">
  <div className="row">
    <div className="col-lg-8 col-md-7 col-12">
      {/* Start Single Block */}
      <div className="single-block description">
        <h3>Description</h3>
        <p>
        {Book && Book.desc}.
        </p>
       
      </div>
      {/* End Single Block */}
   
   
 
    </div>
  </div>
</div>

    </div>
  </section>
  {/* End Item Details */}
</>

  )
}
