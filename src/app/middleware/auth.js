const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	// Não deixa usar apis se não estiver com Token valido

	if (req.originalUrl === "/authenticate") {
		return next();
	}

	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ message: "Token not provided" });
	}

	// 'Bearer <token aqui>'
	// Usa a desestruturação de array para pegar a segunda parte do SPLIT
	const [, token] = authHeader.split(" ");

	try {
		jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).send({ error: "Invalid token" });
			}

			req.userId = decoded.id;
			return next();
		});
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
};
