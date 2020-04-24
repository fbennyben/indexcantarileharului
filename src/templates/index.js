import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import classNames from "classnames";

// Components
import Input from "../components/Input/Input";
import Filter from "../components/Filter/Filter";

// Icons
import ChevronIcon from "../images/chevron.svg";

// Css
import styles from "../styles/index.module.css";
import { filterSongs } from "../js/util";

export default function IndexTemplate(data){
	const rawSongs = data.pageContext.songs;
	const limit = 50;
	const[offset, setOffset] = useState(0);
	const[sort, setSort] = useState("Name");
	const[order, setOrder] = useState("desc");
	const[query, setQuery] = useState("");
	const[filter, setFilter] = useState([]);
	const[songs, setSongs] = useState([]);

	const onSearch = value => {
		setOffset(0);
		setQuery(value);
	};

	const onFilterChange = value => {
		setOffset(0);
		setFilter(value);
	};

	const onChangeSort = options => {
		const{ order, sort } = options;

		setSort(sort);
		setOrder(order);
	};

	const onScroll = e => {
		const container = e.target;
		const scrollHeight = container.scrollHeight;
		const height = container.clientHeight;
		const scrollPos = container.scrollTop;
		const threshold = height + scrollPos;

		if(threshold >= scrollHeight)
			setOffset(offset + limit);
	};

	useEffect( () => {
		const newSongs = filterSongs(rawSongs, {
			offset,
			sort,
			order,
			limit,
			filter,
			q: query
		});

		setSongs(newSongs);
	}, [offset, sort, order, query, filter]);

	return(
		<main className={styles.main} onScroll={onScroll}>
			<div className={styles.container}>
				<Input label="Caută..." onSearch={onSearch} />
				<Filter songs={rawSongs} onChange={onFilterChange} />
				<ul className={styles.legend}>
					<li>
						<span className={styles.legendKey}>CH</span>
						<span className={styles.legendDesc}>Cântările Harului</span>
					</li>
					<li>
						<span className={styles.legendKey}>CD</span>
						<span className={styles.legendDesc}>Cântările Domnului</span>
					</li>
					<li>
						<span className={styles.legendKey}>CB</span>
						<span className={styles.legendDesc}>Cântările Bibliei</span>
					</li>
				</ul>
				<List songs={songs} sort={sort} order={order} onChangeSort={onChangeSort} />
			</div>
		</main>

	);
}

function List({ songs, order, sort, onChangeSort }){
	return(
		<ul className={styles.indexList}>
			<li className={classNames(styles.headings, styles.listItem)}>
				<Sortable
					keyName="Name"
					activeKey={sort}
					order={order}
					className={styles.name}
					onChangeSort={onChangeSort}
				>
					Numele
				</Sortable>

				<Sortable
					keyName="Author"
					activeKey={sort}
					order={order}
					className={styles.author}
					onChangeSort={onChangeSort}
				>
					Autor
				</Sortable>

				<Sortable
					keyName="Number"
					activeKey={sort}
					order={order}
					className={styles.number}
					onChangeSort={onChangeSort}
				>
					Numărul
				</Sortable>
				<span className={styles.volume}>Volumul</span>
				<span className={styles.pdf}>PDF</span>
				<span className={styles.youtube}>Youtube</span>
			</li>

			{
				songs.map( song => {
					return<Row song={song} key={song.Name + song.Number + Math.random()} />;
				})
			}
		</ul>
	);
}

function Sortable({ keyName, activeKey, order, className, children, onChangeSort }){
	const classes = classNames({
		[className]: true,
		[styles.sortable]: true,
		[styles.sortableActive]: activeKey === keyName,
		[styles[order]]: true
	});

	const onClick = () => {
		const options = {
			sort: keyName,
			order: keyName === activeKey ? (order === "desc" ? "asc" : "desc") : order
		};

		onChangeSort(options);
	};

	return(
		<span className={classes} onClick={onClick}>
			{children}
			<ChevronIcon className={styles.chevron} />
		</span>
	);
}

function Row({ song }){
	const data = useStaticQuery(graphql`
	query {
		youtube: file(relativePath: { eq: "youtube.png" }){
			childImageSharp {
				fluid(maxWidth: 200){
					...GatsbyImageSharpFluid
				}
			}
		}
		pdf: file(relativePath: { eq: "adobe.png" }){
			childImageSharp {
				fluid(maxWidth: 200){
					...GatsbyImageSharpFluid
				}
			}
		}
	}
	`);

	const pdfImg = data.pdf.childImageSharp.fluid;
	const youtubeImg = data.youtube.childImageSharp.fluid;

	return(
		<li key={song.id} className={styles.listItem}>
			<span className={classNames(styles.name, styles.cell)}>{song.Name}</span>
			<span className={classNames(styles.author, styles.cell)}>{song.Author}</span>
			<span className={classNames(styles.number, styles.cell)}>{song.Number}</span>
			<span className={classNames(styles.volume, styles.cell)}>{song.Volume}</span>
			<span className={classNames(styles.pdf, styles.cell)}>
				{song.PDF
					? <a href={song.PDF} target="_blank" rel="noopener noreferrer"><Img className={styles.image} fluid={pdfImg} alt="PDF" /></a>
					: ""
				}
			</span>
			<span className={classNames(styles.youtube, styles.cell)}>
				{song.Youtube
					? <a href={song.Youtube} target="_blank" rel="noopener noreferrer"><Img className={styles.image} fluid={youtubeImg} alt="Youtube" /></a>
					: ""
				}
			</span>
		</li>
	);
}

List.propTypes = {
	songs: PropTypes.array.isRequired,
	order: PropTypes.string,
	sort: PropTypes.string,
	onChangeSort: PropTypes.func
};

Sortable.propTypes = {
	keyName: PropTypes.string,
	activeKey: PropTypes.string,
	order: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	onChangeSort: PropTypes.func
};

Row.propTypes = {
	song: PropTypes.object
};
