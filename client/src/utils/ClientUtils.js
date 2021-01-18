export const ServerPORT = 8000;
console.log("Prod", process.env.NODE_ENV);
export const PATH =
  process.env.NODE_ENV === "production"
    ? "ws://63.250.61.125"
    : "ws://localhost";

// export const PATH = "ws://localhost";
