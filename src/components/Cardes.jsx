import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Cardes.css';
import { Api, Favoris, updateBusinessCard } from '../Api/api';
import Loading from './Global_Style/londing/londing';

const Cardes = ({ card, onDelete, currentUser, setIsCrrated ,setLoading}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(card.name);
  const [updatedCompany, setUpdatedCompany] = useState(card.company);
  const [updatedTitle, setUpdatedTitle] = useState(card.title);
  const [isFavorited, setIsFavorited] = useState(card.isFavorited);


  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${Api}/${updateBusinessCard}/${card.id}`, {
        name: updatedName,
        company: updatedCompany,
        title: updatedTitle
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      });

      setIsEditing(false);
      setIsCrrated(prevState => !prevState);

      Swal.fire({
        title: "Update!",
        text: "Your file has been Updated.",
        icon: "success"
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  };

  const handleFavoris = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${Api}/${Favoris}/${card.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const updatedFavoritedStatus = response.data.isFavorited;
      console.log(response)

      // Update the favorite status in the UI
      setIsFavorited(updatedFavoritedStatus);
     setTimeout(() => {
      setLoading(false);
     }, 1000);

    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
      // Add error handling logic here
    }
  };


  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedName(card.name);
    setUpdatedCompany(card.company);
    setUpdatedTitle(card.title);
  };

  const handleDelete = () => {
    onDelete(card.id);
  };

  useEffect(() => {
    setIsCrrated(prevState => !prevState);
  }, [isFavorited]);

  return (

    <>
   
   
 
      <div className="col-lg-6 col-12 position-relative ">
              {/* Single News */}
              <div className="single-news wow fadeInUp" data-wow-delay=".2s">
                <div className="image">
                {currentUser && card.user_id === currentUser.id && (
                <div className=' position-absolute  top-0  z-3 pt-2 pe-2 end-0 '>
                    <button className="btn btn-primary me-2" onClick={handleUpdate}>
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="btn btn-danger " onClick={handleDelete}>
                   <i class="fa-regular fa-trash-can"></i>
                  </button>
                
                </div>
              )}
                  <a href="javascript:void(0)">
                    <img
                      className="thumb"
                      src="assets/images/blog/blog1.jpg"
                      alt="#"
                    />
                  </a>
                </div>
                {isEditing ? (
          <form onSubmit={handleSubmit} className='p-4'>
            <div className="mb-3">
              <label htmlFor="updatedName" className="form-label">Name</label>
              <input type="text" className="form-control" id="updatedName" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="updatedCompany" className="form-label">Company</label>
              <input type="text" className="form-control" id="updatedCompany" value={updatedCompany} onChange={(e) => setUpdatedCompany(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="updatedTitle" className="form-label">Title</label>
              <input type="text" className="form-control" id="updatedTitle" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary mx-2" onClick={handleCancel}>Cancel</button>
          </form>
        ) : (
                <div className="content-body">
                  <h4 className="title">
                    <a href="javascript:void(0)">
                    {card.title}
                    </a>
                  </h4>
                  <p>
                  Company: {card.company}
                  </p>
                  <div className="meta-details d-flex  justify-content-between ">
                    <ul>
                      <li>
                        <a href="javascript:void(0)">Jan 24,2023</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Title: {card.name}</a>
                      </li>
                    </ul>
                  <a onClick={handleFavoris} href="javascript:void(0)">
                      <i
                        className={!card.favorited ? 'lni lni-heart text-danger ' : 'fa-solid fa-heart text-danger'}></i></a>
                   
                  </div>
           
                </div>
                 )}
              </div>
              {/* End Single News */}
            
    </div>

    </>
  );
};

export default Cardes;
