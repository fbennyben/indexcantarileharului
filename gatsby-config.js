module.exports = {
	siteMetadata: {
		title: "Gatsby Default Starter",
		description: "Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",
		author: "@gatsbyjs"
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: `${__dirname}/src/images`
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "csv",
				path: `${__dirname}/content/uploads`
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "json",
				path: `${__dirname}/content/files`
			}
		},
		{
			resolve: "gatsby-transformer-csv",
			options: {
				typeName: "Csv"
			}
		},
		{
			resolve: "gatsby-transformer-json",
			options: {
				path: `${__dirname}/content/files`
			}
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					include: /src\/images/
				}
			}
		},
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		"gatsby-plugin-netlify-cms",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "gatsby-starter-default",
				short_name: "starter",
				start_url: "/",
				background_color: "#663399",
				theme_color: "#663399",
				display: "minimal-ui"
			}
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	]
};
