import React from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function Vans() {
  const [vans, setVans] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");
  
  React.useEffect(() => {
    fetch("/api/vans")
      .then(res => res.json())
      .then(data => setVans(data.vans));
  }, [typeFilter]) 

  const displayedVans = typeFilter
    ? vans.filter(van => van.type === typeFilter)
    : vans

  const vanElements = displayedVans.map(van => (
    <div key={van.id} className="van-tile">
      <Link 
        to={van.id} 
        state={{ 
          search: `?${searchParams.toString()}`,
          type: typeFilter
        }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
    )
  )

    return (
      <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
          <button 
            onClick={() => setSearchParams({ type: typeFilter && typeFilter === "simple" ? "" : "simple" })}
            className={`van-type simple ${typeFilter === "simple" ? "selected" : null}`}
          >Simple</button>
          <button 
            onClick={() => setSearchParams({ type: typeFilter && typeFilter === "luxury" ? "" : "luxury" })}
            className={`van-type luxury ${typeFilter === "luxury" ? "selected" : null}`}
          >Luxury</button>
          <button 
            onClick={() => setSearchParams({ type: typeFilter && typeFilter === "rugged" ? "" : "rugged" })}
            className={`van-type rugged ${typeFilter === "rugged" ? "selected" : null}`}
          >Rugged</button>
          {typeFilter 
            ? (
          <button 
            onClick={() => setSearchParams({ })}
            className="van-type clear-filters"
          >Clear filters</button>
          ) : null}
          
        </div>
        <div className="van-list">

      {vanElements}
        </div>
      </div>
    )
};