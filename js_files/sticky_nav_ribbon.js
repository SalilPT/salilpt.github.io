/*Code adapted from W3Schools at
https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
*/

// Get the navigation ribbon
var nav_ribbon = document.getElementById("navigation_ribbon");

// Get the offset position of the navigation ribbon
var top_offset = nav_ribbon.offsetTop;

// Div used to offset the rest of the page under the nav. ribbon when it's sticky
var dummy_div = undefined;

/* Add the sticky class to the navigation ribbon when you reach its scroll
position. Remove "sticky" when you leave the scroll position*/
function stickyNavRibbon() {
	/* Get the current nav. ribbon height. Needs to be checked every
	time the function is called to prevent incorrect dummy div sizing
	if the viewport is resized inbetween scrolls*/
	var nav_ribbon_height = nav_ribbon.offsetHeight;

	// If the user has scrolled far enough to make the nav. ribbon sticky
	if (window.pageYOffset >= top_offset) {
		nav_ribbon.classList.add("sticky_nav_ribbon");
		// If a dummy div element doesn't yet, insert one before all the content under the navigation ribbon with a height equal to the height of the nav. ribbon
		if (dummy_div == undefined) {
			dummy_div = document.createElement("div");
			dummy_div.style.height = nav_ribbon_height.toString() + "px";
			dummy_div.className = "sticky_nav_ribbon_dummy_div";
			nav_ribbon.insertAdjacentElement("afterend", dummy_div);
		}
	}
	
	// If the user hasn't scrolled far enough to make the nav. ribbon sticky
	else {
		nav_ribbon.classList.remove("sticky_nav_ribbon");
		if (dummy_div != undefined) {
			dummy_div.remove();
			dummy_div = undefined;
		}
    }
}

// When the user scrolls the page, make the navigation ribbon sticky
window.onscroll = function() {
	stickyNavRibbon();
};

// When the user resizes the page, update top_offset and resize dummy_div (if it exists) accordingly
window.onresize = function() {
	//console.log("resizing");
	/*Scroll to the top of the page, get the distance from the top of the page to the nav. ribbon, then scroll back*/
	let scroll_y_pos = window.pageYOffset;
	//console.log("scroll_y_pos: " + scroll_y_pos);
	document.querySelector("html").scrollTop = 0;
	nav_ribbon.classList.remove("sticky_nav_ribbon");
	top_offset = nav_ribbon.offsetTop;
	//console.log("New top_offset: " + top_offset);
	// Need to update the height of the dummy div.
	if(dummy_div != undefined) {
		//console.log("Setting dummy_div to " + nav_ribbon.offsetHeight.toString() + "px");
		dummy_div.style.height = nav_ribbon.offsetHeight.toString() + "px";
	}
	// Scroll back
	document.querySelector("html").scrollTop = scroll_y_pos;
};
