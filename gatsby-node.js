/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const csvFilePath = path.join(__dirname, "static", "files", "uploads", "Template.csv");

/* async function parseCSV(){
	const result = [];

	return new Promise( (resolve, reject) => {
		fs.createReadStream(csvFilePath)
			.pipe(csv())
			.on("data", data => result.push(data))
			.on("end", () => {
				resolve(result);
			});
	});
} */

exports.createPages = async ({ graphql, actions }) => {

};
