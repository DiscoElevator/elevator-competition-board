import {select} from "d3";
import elevatorTmpl from "./rating-place__elevator.pug";

export {renderElevator};

function renderElevator(ratingRecord) {
	return select(document.createElement("div"))
		.html(elevatorTmpl(ratingRecord))
		.select("svg").node();
}
