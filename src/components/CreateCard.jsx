import React, { useState , useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { Api, createBusinessCard } from '../Api/api';

export default function CreateCard({ setIsCrrated ,setLoading }) {
  const [Name, setName] = useState('') 
  const [Company, setCompany] = useState('') 
  const [Title, setTitle] = useState('') 
  const [errors, setErrors] = useState('') 
  const navigate = useNavigate();

  useEffect(() => {
    if ( localStorage.getItem('access_token')) {
      navigate('/Home')
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsObject = {};

    if (Name === '') {
      errorsObject.Name = 'Name is required';
    }
    if (Company === '') {
      errorsObject.Company = 'Company is required';
    }
    if (Title === '') {
      errorsObject.Title = 'Title is required';
    }

    setErrors(errorsObject);

    if (Object.keys(errorsObject).length === 0) {
      setLoading(true); // Set loading to true when submitting

      fetch(`${Api}/${createBusinessCard}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          name: Name,
          company: Company,
          title: Title
        })
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Card has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        setIsCrrated(prevState => !prevState);

        setName('');
        setCompany('');
        setTitle('');
        setLoading(false); // Set loading to false after the card is added
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Set loading to false in case of an error
      });
    }
  };

  return (
    
    
    
    <aside className="col-lg-4 col-md-5 col-12">
        <form onSubmit={handleSubmit} >
        <div className="sidebar blog-grid-page bg-body-secondary p-5" style={{ borderRadius: '20px' ,boxShadow: '0 2px 6px #0d6efd'}}>
        
        {/* Start Single Widget */}
        <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">Name</label>
        <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={Name} onChange={(e) => setName(e.target.value)} />
        {errors.Name && (
          <div id="emailHelp" className="form-text text-danger">{errors.Name}</div>
        )}    
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputCompany" className="form-label">Company</label>
        <input type="text" className="form-control" id="exampleInputCompany" value={Company}  onChange={(e) => setCompany(e.target.value)} />
        {errors.Company && (
          <div id="emailHelp" className="form-text text-danger">{errors.Company}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputtitle" className="form-label">Title</label>
        <input type="text" className="form-control" id="exampleInputtitle" aria-describedby="emailHelp" value={Title} onChange={(e) => setTitle(e.target.value)} />
        {errors.Title && (
          <div id="emailHelp" className="form-text text-danger">{errors.Title}</div>
        )}    
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>

        {/* End Single Widget */}
      </div>
      </form>
      </aside>

  );
}
