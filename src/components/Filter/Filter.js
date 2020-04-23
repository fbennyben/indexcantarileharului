import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components
import { Dropdown } from "semantic-ui-react";
/* import SelectSearch from "react-select-search"; */

// Css
import styles from "./filter.module.css";

export default function Filter({ songs, onChange }){
	const[filter, setFilter] = useState([]);
	const volumes = getListByKey(songs, "Volume");
	const authors = getListByKey(songs, "Author");

	const onVolumeChange = (e, { value }) => {
		const data = value;
		console.log(data);

		const newFilter = [...filter];

		if(!data)
			delete newFilter[0];
		else
			newFilter[0] = data;

		setFilter(newFilter);
	};

	const onAuthorChange = (e, { value }) => {
		const data = value;

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
				<Dropdown
					placeholder="Volumul"
					search
					selection
					scrolling
					options={volumes}
					onChange={onVolumeChange}
				/>
			</div>

			<div className={styles.authorFilter}>
				<Dropdown
					placeholder="Autor"
					search
					selection
					scrolling
					options={authors}
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

	const options = values.map( volume => ({ key: volume, text: volume, value: volume }));
	options.unshift({ key: "nimic", text: "Nimic", value: "" });

	return options;
}

Filter.propTypes = {
	songs: PropTypes.array.isRequired,
	onChange: PropTypes.func
};
