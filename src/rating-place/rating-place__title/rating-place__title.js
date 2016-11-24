import {select} from "d3";
import ratingPlaceTitleTmpl from "./rating-place__title.pug";

export {renderRatingPlaceTitle, updateRatingPlaceTitle};

function renderRatingPlaceTitle(ratingRecord) {
	const title = select(document.createElement("div"))
		.html(ratingPlaceTitleTmpl(ratingRecord))
		.select("svg");
	return title.node();
}

function updateRatingPlaceTitle(ratingRecord) {
	const PLACE_FONT_SIZE = [7, 5, 5].map(size => `${size}vh`);

	if (ratingRecord.place) {
		select(this)
			.style("visibility", "visible")
			.select(".rating-place__name")
			.style("font-size", PLACE_FONT_SIZE[ratingRecord.place - 1])
			.text(ratingRecord.name);
	} else {
		select(this)
			.style("visibility", "hidden");
	}
}
