import {select} from "d3";

export {updateRatingLayout};

function updateRatingLayout() {
	select(this)
		.classed("rating-layout__first-place", d => d.index === 1)
		.classed("rating-layout__second-place", d => d.index === 2)
		.classed("rating-layout__third-place", d => d.index === 3);
}
