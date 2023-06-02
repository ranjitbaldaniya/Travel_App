import React from "react";
import { Button } from "reactstrap";

const Pagination = ({ postPerPage, totalPost, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {/* style={{border: "1px solid blue" ,borderRadius:"20%", padding : "5px" }} */}
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="pageItem me-1">
            <Button
              color="primary"
              onClick={() => paginate(number)}
              className="pageLink"
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
