import {select} from "d3";
import partial from "lodash/partial";

import {renderBrickWall, updateBrickWallAnimation} from "../brick-wall/brick-wall.js";
import {renderElevator} from "./rating-place__elevator/rating-place__elevator.js";

export {renderRatingPlace, updateRatingPlace};

function renderRatingPlace() {
	const ratingPlace = select(document.createElement("div"))
		.attr("class", "rating-place");

	ratingPlace.append(renderBrickWall);
	ratingPlace.append(renderElevator)
		.style("position", "absolute")
		.style("left", "19%")
		.style("bottom", "0px")
		.style("width", "62%");

	return ratingPlace.node();
}

function updateRatingPlace(ratingRecord) {
	const duration = Math.max(200, 2000 / (1 + ratingRecord.rating));
	select(this)
		.each(partial(updateBrickWallAnimation, duration));
}
