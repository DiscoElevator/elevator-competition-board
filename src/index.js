import {select} from "d3";

import {updateRatingPage} from "./rating-page/rating-page.js";
import {subscribeToRating} from "./rating.data.js";

subscribeToRating(rating => {
	select(document.body).datum(rating).each(updateRatingPage);
});
