import {select} from "d3";
import flow from "lodash/flow";

import {renderRatingPlaceTitle, updateRatingPlaceTitle} from "./rating-place__title/rating-place__title.js";
import {renderBrickWall, updateBrickWallAnimation} from "../brick-wall/brick-wall.js";
import {renderElevator, updateElevator} from "./rating-place__elevator/rating-place__elevator.js";

export {renderRatingPlace, updateRatingPlace};

function renderRatingPlace() {
	const ratingPlace = select(document.createElement("div"))
		.attr("class", "rating-place");

	ratingPlace.append(renderRatingPlaceTitle);
	ratingPlace.append(renderBrickWall)
		.classed("rating-place__brick-wall", true);
	ratingPlace.append(renderElevator);

	return ratingPlace.node();
}

function updateRatingPlace(ratingRecord) {
	select(this).select(".rating-place__title")
		.each(updateRatingPlaceTitle);
	select(this).select(".brick-wall")
		.each(flow(getBrickWallAnimationDuration, updateBrickWallAnimation));
	select(this).select(".rating-place__elevator")
		.each(updateElevator)
		.call(updateElevatorLayout, ratingRecord);
}

function updateElevatorLayout(elevator, ratingRecord) {
	let bottom;
	if (ratingRecord.place) {
		bottom = (10 / ratingRecord.place) + (0.1 * ratingRecord.points);
	} else {
		bottom = 0;
	}
	elevator.style("bottom", `${parseInt(bottom)}%`);
}

function getBrickWallAnimationDuration(ratingRecord) {
	if (ratingRecord.level) {
		return Math.max(200, 2000 / ratingRecord.level);
	} else {
		return 0;
	}
}
