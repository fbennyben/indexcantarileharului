import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import arraySort from "array-sort";

// Components
import { Dropdown } from "semantic-ui-react";
/* import SelectSearch from "react-select-search"; */

// Css
import styles from "./filter.module.css";

export default function Filter({ songs, onChange }){
	const[filter, setFilter] = useState([]);
	const volumesList = getListByKey(songs, "Volume");
	const authorsList = getListByKey(songs, "Author");
	const volumes = sortVolumes(volumesList);
	const authors = sortAuthors(authorsList);

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

function sortAuthors(authors){
	let sortedAuthors = arraySort(authors, "value");
	sortedAuthors.unshift({ key: "nimic", text: "Nimic", value: "" });

	return sortedAuthors;
}

function sortVolumes(volumes){
	const volumeParts = volumes.map( vol => {
		const firstNumber = vol.value.search(/\d/);
		const letters = vol.value.substring(0, firstNumber);
		const numbers = parseInt(vol.value.substr(firstNumber, vol.value.length));

		return{
			whole: vol.value,
			withNumbers: letters + (numbers < 10 ? 0 : "") + numbers
		};
	});
	let sortedVolumes = arraySort(volumeParts, "withNumbers");

	sortedVolumes = sortedVolumes.map( obj => {
		const val = obj.whole;

		return{
			key: val,
			text: val,
			value: val
		};
	});

	sortedVolumes.unshift({ key: "nimic", text: "Nimic", value: "" });

	return sortedVolumes;
}

function getListByKey(list, key){
	const allValues = list.map( song => song[key]);
	const values = [];

	for(let value of allValues)
		if(!values.includes(value) && value)
			values.push(value);

	const options = values.map( volume => ({ key: volume, text: volume, value: volume }));

	return options;
}

Filter.propTypes = {
	songs: PropTypes.array.isRequired,
	onChange: PropTypes.func
};
