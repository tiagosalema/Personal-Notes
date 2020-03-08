import React from "react";
import queryString from "query-string";

const Posts = ({ match, location }) => {
  const result = queryString.parse(location.search);
  return (
    <div>
      <h1>Posts</h1>
      <p>
        Year: {match.params.year}, Month: {match.params.month}
      </p>
      <p>
        We are in {result.year} and the month is {result.month}.
      </p>
    </div>
  );
};

export default Posts;
