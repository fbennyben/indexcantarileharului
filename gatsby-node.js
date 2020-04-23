/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

async function parseCSV(csvFilePath){
	const result = [];

	return new Promise( (resolve, reject) => {
		fs.createReadStream(csvFilePath)
			.pipe(csv())
			.on("data", data => {
				const values = Object.keys(data).map( key => {
					return data[key];
				});

				result.push({
					Name: values[0],
					"Number": values[1],
					Volume: values[2],
					Author: values[3],
					PDF: values[4],
					Youtube: values[5]
				});
			})
			.on("end", () => {
				resolve(result);
			});
	});
}

exports.createPages = async ({ graphql, actions }) => {
	const{ createPage } = actions;

	const jsonFile = await graphql(`
		query {
			filesJson{
				csv
			}
		}
		`
	);

	console.log(jsonFile.data.filesJson.csv);
	const csvFilePath = `${__dirname}/content${jsonFile.data.filesJson.csv}`;
	const csvData = await parseCSV(csvFilePath);

	console.log(csvData);

	createPage({
		path: "/",
		component: path.resolve("src/templates/index.js"),
		context: {
			songs: csvData
		}
	});
};
