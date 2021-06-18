// This component will display after 1 second.
// This component display in full size of the screen.
// in the center of the screen will show text and loading dots.
// the text describes the action like (deleting, updating, ...)

// Props:
// - bgColor: background color
// - foreColor: text color
// - text: the text that will display in the center of the component
// - onclick: action that will trigger when click on the component

// Own State:
// - show: boolean that indicates if show the component or not.

// style
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

// style
import "./action-loader.style.scss";

function ActionLoader({ bgColor, foreColor, text, onclick }) {
  // const [show, setShow] = useState(true);

  useEffect(() => {
    // const interval = setTimeout(() => {
    //   setShow(true);
    // }, 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  });

  return (
    <>
      <div className="full-size" onClick={() => onclick()}>
        <ReactLoading color="#fff" type="bars" height={100} width={100} />
      </div>
    </>
  );
}

export default ActionLoader;
