import {select} from "d3";
import {paths} from "textures";

export {renderBrickWall};

const W = 100;
const H = 100;

function renderBrickWall(brickSize = 2) {
	const wall = select(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
		.attr("width", "100%").attr("height", "100%")
		.attr("viewBox", `0 0 ${W} ${H}`)
		.attr("preserveAspectRatio", "none");
	const brickTexture = createBrickTexture(brickSize);
	wall.call(brickTexture);
	wall.append("rect")
		.attr("x", 0).attr("y", 0)
		.attr("width", W).attr("height", H)
		.style("fill", brickTexture.url());
	return wall.node();
}

function createBrickTexture(brickSize) {
	return paths()
		.d("woven")
		.size(brickSize)
		.strokeWidth(brickSize / 10)
		.stroke("darkorange");
}
