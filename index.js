// Load the http module to create an http server.
const http = require('http');

import express from "express";

const PORT = 8080;
const app = express();

app.get("/", (req, res) => res.json({status: "Lina come muchos moquitos por la mañana por la tarde y por la noche"}))

app.listen(PORT, () => console.log(`NTask API - PORT ${PORT}`));