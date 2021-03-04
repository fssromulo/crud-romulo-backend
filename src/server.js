const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes");
const server = require("http").Server(app);
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.use("/", routes);
server.listen(port, () => {
	console.log(`Running on port ${port}`);
});
