
if (process && process.env.NODE_ENV === "DEBUG") {
    console.log("Running in debug mode");
} else {
    console.log("Running in production mode");
}

require("./src/index.js");
