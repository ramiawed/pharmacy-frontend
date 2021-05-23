// library
import {
  TiMediaPlayReverse,
  TiMediaPlay,
  TiMediaRewind,
  TiMediaFastForward,
} from "react-icons/ti";

// style
import "./pager.style.scss";

function Pager({ numberPages, currentPage, count }) {
  const numPage = numberPages * 1;
  const current = currentPage * 1 > numPage ? 1 : currentPage * 1;

  const getArray = () => {
    //   if the number of page less than or equals to 5
    if (numPage <= 5) {
      const arr = [];
      for (let i = 1; i <= numPage; i++) {
        arr.push(i);
      }
      return arr;
    }

    const arr = [];

    if (current <= 2) {
      arr.push(1, 2, 3, "empty", numPage);
      return arr;
    }

    if (numPage - current <= 2) {
      arr.push(1, "empty", numPage - 2, numPage - 1, numPage);
      return arr;
    }

    arr.push(1, "empty", current - 1, current, current + 1, "empty", numPage);
    return arr;
  };

  return (
    <div className="pager-container">
      <div className="pager-icon">
        <TiMediaRewind />
      </div>
      <div className="pager-icon">
        <TiMediaPlayReverse />
      </div>

      {getArray().map((page, index) =>
        page === "empty" ? (
          <Dots />
        ) : (
          <div
            className={`${current === page ? "selected" : ""} pager-icon`}
            key={page}
          >
            {page}
          </div>
        )
      )}

      <div className="pager-icon">
        <TiMediaPlay />
      </div>
      <div className="pager-icon">
        <TiMediaFastForward />
      </div>
    </div>
  );
}

export default Pager;

function Dots() {
  return <div>...</div>;
}
