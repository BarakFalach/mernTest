import React from "react";
import podium from "../../assets/winner_podium.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FaceIcon from "@material-ui/icons/Face";

import Confetti from "react-confetti";

export const Top3 = () => {
  const fruits = [
    { key: 1, name: "Eden" },
    { key: 2, name: "Barak" },
    { key: 3, name: "Asaf" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <List component='nav'>
          {fruits.map((f) => (
            <ListItem key={f.key}>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={f.name} />
            </ListItem>
          ))}
        </List>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          maxWidth: "500",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Confetti
          run={true}
          friction={0.98}
          numberOfPieces={145}
          width={700}
          height={500}
        ></Confetti>
        <img alt='mangerIcon' src={podium} />
      </div>
    </div>
  );
};
// export class Top3 extends React.Component {
//   onClickDefault() {
//     this.refConfetti();
//   }

//   onClickCustom() {
//     this.refConfetti({ particleCount: 500 });
//   }

//   onClickCallback() {
//     this.refConfetti().then(() => {
//       console.log("do something after animation");
//     });
//   }

//   onClickReset() {
//     this.refConfetti.reset();
//   }

//   render() {
//     const style = {
//       position: "fixed",
//       width: "100%",
//       height: "100%",
//       zIndex: -1,
//     };

//     return (
//       <>
//         <Confetti
//           style={style}
//           refConfetti={(ref) => (this.refConfetti = ref)}
//         />
//         <img
//           alt='mangerIcon'
//           src={podium}
//           width='350px'
//           height='400px'
//           className='avatar'
//         />

//         <button onClick={this.onClickDefault.bind(this)}>
//           Fire with default
//         </button>
//         <button onClick={this.onClickCustom.bind(this)}>
//           Fire with custom
//         </button>
//         <button onClick={this.onClickCallback.bind(this)}>
//           Fire with callback
//         </button>
//         <button onClick={this.onClickReset.bind(this)}>Reset</button>
//       </>
//     );
//   }}
