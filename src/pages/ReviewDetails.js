import React from "react";
import { useParams } from "react-router-dom"; //for dynamic rendering
import useFetch from "../hooks/useFetch";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          title
          rating
          body
        }
      }
    }
  }
`;

function ReviewDetails() {
  const { id } = useParams();
  //     const { data, loading, error } = useFetch(
  //       `http://localhost:1337/api/reviews/${id}`
  //     );
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log(data.review.data.attributes);

  return (
    <div className="review-card">
      <div className="rating">{data.review.data.attributes.rating}</div>
      <h2>{data.review.data.attributes.title}</h2>

      <small>console list</small>

      <p>
        <ReactMarkdown>{data.review.data.attributes.body}</ReactMarkdown>
      </p>
    </div>
  );
}

export default ReviewDetails;
