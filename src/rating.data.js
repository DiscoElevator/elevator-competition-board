import sortBy from "lodash/sortBy";
import take from "lodash/take";
import maxBy from "lodash/maxBy";
import assign from "lodash/assign";
import fill from "lodash/fill";
import partial from "lodash/partial";
import io from "socket.io-client";
import config from "config";

export {subscribeToRating};

const EMPTY_RATING_RECORD = {
	place: 0,
	points: 0,
	name: "",
	level: 0,
	avatar: ""
};

function subscribeToRating(callback) {
	// socket
	const socket = io(config.gameServerUrl);
	socket.on("scores_changed", data => {
		console.log("change", data);
		callback(getNormalizedTop3(data));
	});
	socket.on("connect", () => {
		socket.emit("get_scores");
	});
	// callback(getNormalizedTop3());
	// setInterval(function () {
	// 	callback(getNormalizedTop3());
	// }, 3000);
}

function getNormalizedTop3(rating) {
	// let rating = RAW_RATING;
	// randomize(rating);
	rating = orderRating(rating);
	rating = take(rating, 3);
	rating = rating.concat(fill(Array(3 - rating.length), EMPTY_RATING_RECORD));
	return normalizeRating(rating);
}

// function randomize(rating) {
// 	rating.forEach(ratingRecord => {
// 		ratingRecord.level = parseInt(1 + Math.random() * 10);
// 		ratingRecord.score = 100 * ratingRecord.level +  100 * Math.random();
// 	});
// }

function orderRating(rating) {
	rating = sortBy(rating, ratingRecord => -ratingRecord.points);
	return rating.map((ratingRecord, index) => {
		return assign({}, ratingRecord, {
			place: index + 1
		});
	});
}

function normalizeRating(rating) {
	const bestRatingRecord = maxBy(rating, "points");
	return rating.map(partial(normalizeRatingRecord, bestRatingRecord));
}

function normalizeRatingRecord(bestRatingRecord, ratingRecord) {
	if (bestRatingRecord && bestRatingRecord.points) {
		return assign({}, ratingRecord, {
			points: ratingRecord.points * 100 / bestRatingRecord.points
		});
	} else {
		return ratingRecord;
	}
}
