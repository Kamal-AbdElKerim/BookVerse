import React from 'react';
import './Pagination.css';




const Pagination = ({ links , Page , setPage ,setLoading}) => {
  console.log(links)

    const PaginationPage = (link)=>{
        setLoading(true)
        const url = new URL(link);

        const page = url.searchParams.get('page');

        // console.log(page);
        setPage(page)
        window.scrollTo({ top: 100, behavior: 'smooth' });
        setTimeout(() => {
            setLoading(false);
        }, 800);
    
    }

  return (
    <nav aria-label="Page navigation example">
    <ul className="pagination">
      {links && links.map((link, index) => (
        <li  onClick={link.url === null ? null : () => PaginationPage(link.url)} key={index} className={`page-item ${link.url === null ? 'disabled' : ''} ${link.active ? 'active' : ''}`}>
          <a  href="javascript:void(0)"  className="page-link">
            {link.label.replace('&laquo;',' < ').replace('&raquo;',' > ')}
          </a>
        </li>
      ))}
    </ul>
  </nav>
  
  
  );
};

export default Pagination;
