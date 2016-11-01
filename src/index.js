import {selectAll} from "d3";
import {renderRatingPlace} from "./rating-place/rating-place.js";

import {RATING} from "./rating.mock.js";

function renderRating() {
	selectAll(".rating-place").data(RATING).each(renderRatingPlace);
}

renderRating();
