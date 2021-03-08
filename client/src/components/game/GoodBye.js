import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../layouts/css/Goodbye.css";

const Goodbye = ({ winner }) => {
  localStorage.removeItem("userState");
  return (
    <div className="wholescreen">
      {winner && (
        <h1>
          כל הכבוד מבין כל המשתתפים קיבלת את הניקוד הגבוהה ביותר אראה למפעיל
          המשחק את מסך זה.{" "}
        </h1>
      )}
      <div className="goodbye-label">תודה רבה שהשתתפתם,</div>
      <div className="goodbye-label">ניפגש בפעם הבאה !</div>
      <a href={"https://forms.gle/hUZEis498EbyfF2W9"}>
        אנא לחצו כאן על מנת למלא את הסקר{" "}
      </a>
      <img
        style={{ marginTop: "3%" }}
        alt="mangerIcon"
        src={"logo_detailed.png"}
      />
    </div>
  );
};
Goodbye.prototype = {
  winner: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  winner: state.user.userState.phaseProp.winner,
});
export default connect(mapStateToProps, {})(Goodbye);
