const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes");
const server = require("http").Server(app);
const HOST = process.env.SERVER_SERVER || "0.0.0.0";
const PORT = process.env.SERVER_PORT || 3001;

app.use(express.json());

app.use(cors());
app.use("/", routes);
server.listen(PORT, HOST, () => {
	console.log(`Running on port ${PORT}`);
});
