/*Code adapted from W3Schools at
https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
*/

// Get the navigation ribbon
var nav_ribbon = document.getElementById("navigation_ribbon");

// Get the parent element of the nav. ribbon
var ribbon_parent = nav_ribbon.parentElement;

// Store current y position
var curr_scroll_y = window.pageYOffset;

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
			dummy_div.style.display = "block";
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
	curr_scroll_y = window.pageYOffset;
	
	stickyNavRibbon();
};

// Store current width of page
// var curr_page_width = window.innerWidth;
/* When the user resizes the page, update top_offset and resize dummy_div (if it exists) accordingly */
// NOTE: ResizeObserver exists, but window.onresize has slightly better browser support
window.onresize = function() {
/*
	// Detect change only on width resize or else scrolling on some mobile browsers may stop abrubtly when the URL bar expands
	// NOTE: Scrolling on mobile browsers while zoomed in may sometimes abruptly stop. This might be related to URL bar expansion.
	if(window.innerWidth != curr_page_width) {
		curr_page_width = window.innerWidth;
		
		// Scroll to the top of the page, get the distance from the top of the page to the nav. ribbon, then scroll back
		let scroll_y_pos = window.pageYOffset;
		document.querySelector("html").scrollTop = 0;
		nav_ribbon.classList.remove("sticky_nav_ribbon");
		top_offset = nav_ribbon.offsetTop;
		
		// Need to update the height of the dummy div.
		if(dummy_div != undefined) {
			dummy_div.style.height = nav_ribbon.offsetHeight.toString() + "px";
		}
		
		// Scroll back
		document.querySelector("html").scrollTop = scroll_y_pos;
*/
	// NOTE: Pressing section buttons can change the true offset of the nav. ribbon from parent element on thin screens
	top_offset = nav_ribbon.offsetTop;
	console.log("top_offset: " + top_offset);
	if (dummy_div != undefined) {
		top_offset = dummy_div.offsetTop;
		console.log("pos static offsetTop: " + dummy_div.offsetTop);
		
		dummy_div.style.height = nav_ribbon.offsetHeight.toString() + "px";
	}
	nav_ribbon.style.maxWidth = ribbon_parent.offsetWidth.toString() + "px";
};
