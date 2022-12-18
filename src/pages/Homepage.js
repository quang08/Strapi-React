import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

const REVIEWS = gql`
    query
    getReviews {
      reviews {
        data {
          id,
          attributes {
            title,
            body,
            rating
          }
        }
      }
    } 
`;

export default function Homepage() {
//   const { loading, error, data } = useFetch(
//     "http://localhost:1337/api/reviews"
//   );

  const { loading, error, data } = useQuery(REVIEWS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    // console.log(data.data.reviews);

  return (
    <div>
      {data.reviews.data.map((review) => (
        <div key={review.attributes.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          <small>console list</small>

          <p><ReactMarkdown>{review.attributes.body.substring(0, 200)}</ReactMarkdown></p>
          <p>...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
