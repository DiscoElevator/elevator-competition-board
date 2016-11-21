import {select} from "d3";

import {updateRatingLayout} from "./rating-layout/rating-layout.js";
import {renderRatingPlace, updateRatingPlace} from "./rating-place/rating-place.js";

import {RATING} from "./rating.mock.js";

function renderRating() {
	const ratingPlace = select(".rating-layout").selectAll(".rating-place")
		.data(RATING)
		.each(updateRatingLayout)
		.each(updateRatingPlace);
	ratingPlace.enter()
		.append(renderRatingPlace)
		.each(updateRatingLayout)
		.each(updateRatingPlace);
}

renderRating();
