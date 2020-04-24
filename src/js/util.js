import arraySort from "array-sort";

/**
 * Filter and sort songs.
 * @param {Object[]} songs - The songs to filter.
 * @param {Object} options - Options used to filter the songs.
 * @param {Number} options.limit - The maximum amount of results.
 * @param {Number} options.offset - The offset to begin from.
 * @param {String} [options.sort] - The field to sort by.
 * @param {String} [options.order] - The order of the sort.
 * @param {String} [options.q] - Query to search by.
 */
export function filterSongs(songs, options){
	const{ limit, offset, sort = "Name", order = "desc", q = null, filter = [] } = options;
	const regex = new RegExp(`.*${q}.*`, "i");
	const length = limit + offset;
	let songsCopy = [].concat(songs);

	for(let value of filter){
		console.log(value);

		songsCopy = songsCopy.filter( song => {
			if(filter.length === 0) return true;

			if(isNullOrUndefined(value) || (song.Author === value || song.Volume === value))
				return true;

			return false;
		});
	}

	songsCopy = songsCopy.filter( song => {
		if(regex.test(song.Name.replace(/((-+)|(,+)|("+)|('+))/, "")))
			return true;

		return false;
	});

	if(sort === "Number")
		songsCopy = arraySort(songsCopy, compareNumber, { reverse: order === "asc" });
	else
		songsCopy = arraySort(songsCopy, sort, { reverse: order === "asc" });

	if(songsCopy.length > length) songsCopy.length = length;

	return songsCopy;
}

function compareNumber(a, b){
	const aVal = parseInt(a["Number"]);
	const bVal = parseInt(b["Number"]);

	if(aVal > bVal) return 1;
	if(aVal < bVal) return-1;
	return 0;
}

export function isNullOrUndefined(value){
	if(value === null || value === undefined)
		return true;

	return false;
}
