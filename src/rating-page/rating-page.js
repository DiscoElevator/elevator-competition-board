import {select} from "d3";

import {renderRatingPlace, updateRatingPlace} from "../rating-place/rating-place.js";

export {updateRatingPage};

const PLACES_ORDER = [2, 1, 3];

function updateRatingPage(rating) {
	const ratingPlace = select(this).select(".rating-page").selectAll(".rating-page__rating-place")
		.data(rating)
		.call(updateRatingPlaceLayout)
		.each(updateRatingPlace);

	ratingPlace.enter()
		.append(renderRatingPlace)
		.classed("rating-page__rating-place", true)
		.call(updateRatingPlaceLayout)
		.each(updateRatingPlace);
}

function updateRatingPlaceLayout(ratingPlace) {
	ratingPlace.style("order", (d, i) => PLACES_ORDER[i]);
}
