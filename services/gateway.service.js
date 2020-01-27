"use strict";

const APIGateway = require("moleculer-web");

module.exports = {
	name: "gateway",
	mixins: [APIGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,

		routes: [{
			path: "/v1/api",
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"**"
			],
			aliases: {
				"POST /document": "multipart:v1.document.upload",
			}
		}],
	}
};
