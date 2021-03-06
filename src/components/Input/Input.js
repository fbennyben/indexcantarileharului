import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Icons
import SearchIcon from "../../images/search.svg";

import styles from "./input.module.css";
import { useDebounce } from "../../js/util";

export default function Input({ label, onSearch }){
	const[value, setValue] = useState("");
	const[focus, setFocus] = useState(false);
	const debouncedValue = useDebounce(value, 200);

	const onChange = e => {
		const newValue = e.target.value;

		setValue(newValue);
	};

	const onFocus = e => {
		setFocus(true);
	};

	const onBlur = e => {
		if(value.length === 0)
			setFocus(false);
	};

	const onKeyUp = e => {
		if(e.key === "Enter")
			onSearch(value);
	};

	useEffect( () => {
		onSearch(debouncedValue);
	}, [debouncedValue]);

	return(
		<div className={classNames({
			[styles.container]: true,
			[styles.focus]: focus
		})}>
			<label className={styles.labelWrapper}>
				<SearchIcon className={styles.icon} />
				<span className={styles.label}>{label}</span>
				<input
					type="text"
					className={styles.input}
					value={value}
					onChange={onChange}
					onInput={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					onKeyUp={onKeyUp}
				/>
			</label>
		</div>
	);
}

Input.propTypes = {
	label: PropTypes.string.isRequired,
	onSearch: PropTypes.func
};
