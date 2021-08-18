/*Code adapted from W3Schools at
https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
*/

// When the user scrolls the page, make the navigation ribbon sticky
window.onscroll = function() {
	stickyNavRibbon();
};

// Get the navbar
var nav_ribbon = document.getElementById("navigation_ribbon");

// Get the offset position of the navbar
var top_offset = nav_ribbon.offsetTop;

/* Add the sticky class to the navigation ribbon when you reach its scroll
position. Remove "sticky" when you leave the scroll position*/
function stickyNavRibbon() {
	if (window.pageYOffset >= top_offset) {
		nav_ribbon.classList.add("sticky_nav_ribbon");
  	}
  	else {
		nav_ribbon.classList.remove("sticky_nav_ribbon");
	}
}
