import {select} from "d3";
import flow from "lodash/flow";
import repeat from "lodash/repeat";

import ratingPlaceTmpl from "./rating-place.pug";
import {renderBrickWall, updateBrickWallAnimation} from "../brick-wall/brick-wall.js";
import {renderElevator, updateElevator} from "./rating-place__elevator/rating-place__elevator.js";

export {renderRatingPlace, updateRatingPlace};

function renderRatingPlace() {
	const ratingPlace = select(document.createElement("div"))
		.html(ratingPlaceTmpl())
		.select(".rating-place");

	ratingPlace.append(renderBrickWall);
	ratingPlace.append(renderElevator);

	return ratingPlace.node();
}

function updateRatingPlace(ratingRecord) {
	select(this)
		.each(updateRatingPlaceTitle);
	select(this).select(".brick-wall")
		.each(flow(getBrickWallAnimationDuration, updateBrickWallAnimation));
	select(this).select(".rating-place__elevator")
		.each(updateElevator)
		.call(updateElevatorLayout, ratingRecord);
}

function updateRatingPlaceTitle(ratingRecord) {
	const PLACE_FONT_SIZE = [10, 7, 5].map(size => `${size}vh`);

	if (ratingRecord.place) {
		select(this).select(".rating-place__title")
			.style("visibility", "visible")
			.style("font-size", PLACE_FONT_SIZE[ratingRecord.place]);
		select(this).select(".rating-place__number")
			.text(formatRatingPlaceNumber(ratingRecord));
		select(this).select(".rating-place__name")
			.text(ratingRecord.name);
	} else {
		select(this).select(".rating-place__title")
			.style("visibility", "hidden");
	}

	function formatRatingPlaceNumber(ratingRecord) {
		return repeat("I", ratingRecord.place);
	}
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
