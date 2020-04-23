import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components
import SelectSearch from "react-select-search";

// Css
import styles from "./filter.module.css";
import "react-select-search/style.css";

export default function Filter({ songs, onChange }){
	const[filter, setFilter] = useState([]);
	const volumes = getListByKey(songs, "Volume");
	const authors = getListByKey(songs, "Author");

	const onVolumeChange = data => {
		const newFilter = [...filter];

		if(!data)
			delete newFilter[0];
		else
			newFilter[0] = data;

		setFilter(newFilter);
	};

	const onAuthorChange = data => {
		const newFilter = [...filter];

		if(!data)
			delete newFilter[1];
		else
			newFilter[1] = data;

		setFilter(newFilter);
	};

	useEffect( () => {
		onChange(filter);
	}, [filter]);

	return(
		<div className={styles.container}>
			<div className={styles.volumeFilter}>
				<SelectSearch
					options={volumes}
					name="volume"
					placeholder="Volumul"
					search={true}
					onChange={onVolumeChange}
				/>
			</div>

			<div className={styles.authorFilter}>
				<SelectSearch
					options={authors}
					name="author"
					placeholder="Autor"
					search={true}
					onChange={onAuthorChange}
				/>
			</div>

		</div>
	);
}

function getListByKey(list, key){
	const allValues = list.map( song => song[key]);
	const values = [];

	for(let value of allValues)
		if(!values.includes(value) && value)
			values.push(value);

	values.unshift("");

	return values.map( volume => ({ name: volume, value: volume }));
}

Filter.propTypes = {
	songs: PropTypes.array.isRequired,
	onChange: PropTypes.func
};
