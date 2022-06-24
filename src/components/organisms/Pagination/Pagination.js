import React from "react";
import { Button } from "antd";

export const Pagination = ({ page, setPage }) => {
  return (
    <div className="pagination">
      Pag
      <Button
        className="pagination__btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        {"<"}
      </Button>
      <span>{page}</span>
      <Button className="pagination__btn" onClick={() => setPage(page + 1)}>
        {">"}
      </Button>
    </div>
  );
};
