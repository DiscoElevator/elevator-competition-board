import {select} from "d3";
import {paths} from "textures";

export {renderBrickWall, updateBrickWallAnimation};

const W = 100;
const H = 100;
const BRICK_SIZE = 5;

function renderBrickWall() {
	const wall = select(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
		.attr("class", "brick-wall")
		.attr("width", "100%").attr("height", "100%")
		.attr("viewBox", `0 0 ${W} ${H}`)
		.attr("preserveAspectRatio", "none");
	const brickTextureGenerator = createBrickTextureGenerator(BRICK_SIZE);
	wall.call(brickTextureGenerator);
	wall.append("rect")
		.attr("x", 0).attr("y", 0)
		.attr("width", W).attr("height", H)
		.style("fill", brickTextureGenerator.url());
	wall.select("pattern")
		.append(renderBrickWallAnimation);
	return wall.node();
}

function createBrickTextureGenerator() {
	return paths()
		.d("woven")
		.size(BRICK_SIZE)
		.strokeWidth(BRICK_SIZE / 10)
		.stroke("silver");
}

function renderBrickWallAnimation() {
	return select(document.createElementNS("http://www.w3.org/2000/svg", "animateTransform"))
		.attr("class", "brick-wall__animate")
		.attr("attributeType", "xml").attr("attributeName", "patternTransform")
		.attr("type", "translate")
		.attr("from", "0 0").attr("to", "0 5")
		.attr("repeatCount", "indefinite")
		.node();
}

function updateBrickWallAnimation(duration) {
	select(this).select(".brick-wall__animate")
		.attr("dur", `${duration || 0}ms`);
}
