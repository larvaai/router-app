import React from "react"
import { Link, useParams, useLocation, useLoaderData, defer, Await } from "react-router-dom"
import { getVans } from '../../api'
import { requireAuth } from "../../utils"

export async function loader({ params, request }) {
  await requireAuth(request)
  return defer({ van: getVans(params.id) })
}

export default function VanDetail() {
  const location = useLocation();
  const dataPromise = useLoaderData();

  const search = location.state?.search || ""
  const type = location.state?.type || "all"

  function renderVanElement(van) {
    return (
    <>
      <img src={van.imageUrl} />
      <i className={`van-type ${van.type} selected`}>{van.type}</i>
      <h2>{van.name}</h2>
      <p className="van-price"><span>${van.price}</span>/day</p>
      <p>{van.description}</p>
      <button className="link-button">Rent this van</button>
    </>)
  }

  return (
      <div className="van-detail-container">
        <Link
          to={`..${search}`}
          relative="path"
          className="back-button"
        >&larr; <span>Back to {type} vans</span></Link>

        <div className="van-detail">
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.van}>
              {renderVanElement}
            </Await>
          </React.Suspense>
        </div>
      </div>
  )
};