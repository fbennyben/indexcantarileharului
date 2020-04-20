import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import classNames from "classnames";

import styles from "../styles/index.module.css";

export default function index({ data }){
	const songs = data.allCsv.edges.map( edge => edge.node);

	return(
		<div>
			<ul className={styles.indexList}>
				<li className={classNames(styles.headings, styles.listItem)}>
					<span className={styles.name}>Numele</span>
					<span className={styles.volume}>Volumul</span>
					<span className={styles.number}>Numărul</span>
					<span className={styles.pdf}>PDF</span>
					<span className={styles.youtube}>Youtube</span>
				</li>

				{
					songs.map( song => {
						console.log(song);
						return(
							<li key={song.id} className={styles.listItem}>
								<span className={classNames(styles.name, styles.cell)}>{song.Name}</span>
								<span className={classNames(styles.volume, styles.cell)}>{song.Volume}</span>
								<span className={classNames(styles.number, styles.cell)}>{song.Number}</span>
								<span className={classNames(styles.pdf, styles.cell)}>
									<a href={song.PDF}>PDF</a>
								</span>
								<span className={classNames(styles.youtube, styles.cell)}>
									<a href={song.Youtube}>Youtube</a>
								</span>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}

export const pageQuery = graphql`
query {
	allCsv{
		edges{
			node{
				Author
				Name
				Number
				Volume
				PDF
				Youtube
				id
			}
		}
	}
}
`;

index.propTypes = {
	data: PropTypes.object
};
