"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
	name: "document",

	version: 1,

	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {
		upload: {
			handler: function (ctx) {
				return new this.Promise((resolve, reject) => {
					const readStream = ctx.params;
					const directory = path.join(process.cwd(), "files", ctx.meta.filename);
			
					const writeStream = fs.createWriteStream(directory);
			
					readStream.on("error", (err) => {
						this.logger.error(err);
			
						// Destroy the local file
						writeStream.destroy();
						reject(err);
					});
			
					writeStream.on("error", (err) => {
						this.logger.error(err);
						// Delete the local file
						fs.unlink(directory);
					});
			
					writeStream.on("end", () => {
						resolve({ directory, meta: ctx.meta });
					});
			
					writeStream.on("open", () => {
						readStream.on("open", () => {
							readStream.pipe(writeStream);
						});
					});
				});
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};