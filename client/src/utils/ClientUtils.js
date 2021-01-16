export const ServerPORT = 8000;
console.log("Prod", process.env.NODE_ENV);
export const PATH =
  process.env.NODE_ENV === "production"
    ? "ws://cryptic-earth-72422.herokuapp.com/"
    : "ws://localhost";
