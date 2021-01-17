export const ServerPORT = 8000;
console.log("Prod", process.env.NODE_ENV);
export const PATH =
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^https/, "wss")
    : "ws://localhost";
