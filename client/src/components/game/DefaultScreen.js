import React from "react";
import "../layouts/css/Welcome.css";
import LinearProgress from "@material-ui/core/LinearProgress";

const DefaultScreen = () => {
  return (
    <div className='wholescreen'>
      <div style={{ width: "60%" }} className='welcome-label'>
        מיד תשוב למשחק..
        <LinearProgress style={{ height: "8%", marginTop: "5%" }} />
      </div>
    </div>
  );
};
export default DefaultScreen;
