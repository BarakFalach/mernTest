export const ServerPORT = 8000;
console.log("Prod", process.env.NODE_ENV);
export const PATH =
  process.env.NODE_ENV === "production"
    ? "wss://" + window.location.hostname
    : "ws://localhost";

// export const PATH = "ws://localhost";
