import {select} from "d3";
import elevatorTmpl from "./rating-place__elevator.pug";

export {renderElevator, updateElevator};

function renderElevator(ratingRecord) {
	const elevator = select(document.createElement("div"))
		.html(elevatorTmpl(ratingRecord))
		.select("svg");
	return elevator.node();
}

function updateElevator(ratingRecord) {
	const elevator = select(this);
	if (ratingRecord.avatar) {
		elevator.select(".rating-place__stickman")
			.style("visibility", "visible");
		elevator.select(".rating-place__avatar").attr("xlink:href", ratingRecord.avatar);
		elevator.select(".rating-place__level").text(formatLevel(ratingRecord.level));
	} else {
		elevator.select(".rating-place__stickman")
			.style("visibility", "hidden");
		elevator.select(".rating-place__level").text(formatLevel(0));
	}

	function formatLevel(level) {
		if (level < 10) {
			return `LEVEL 0${level}`;
		} else {
			return `LEVEL ${level}`;
		}
	}
}
