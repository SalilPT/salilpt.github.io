// Get the nav. ribbon and its parent element
var nav_ribbon = document.getElementById("navigation_ribbon");
var ribbon_parent = nav_ribbon.parentElement;

// Set the max width of the nav. ribbon to the width of its parent element
nav_ribbon.style.maxWidth = ribbon_parent.offsetWidth.toString() + "px";

// Create and insert a div element with a height equal to the height of the nav. ribbon
var dummy_div = document.createElement("div");
dummy_div.style.height = nav_ribbon.offsetHeight.toString() + "px";
dummy_div.style.display = "block";
dummy_div.className = "sticky_nav_ribbon_dummy_div";
nav_ribbon.insertAdjacentElement("afterend", dummy_div);

// Get the offset of the nav. ribbon from its parent
var top_offset = nav_ribbon.offsetTop;
console.log("top_offset: " + top_offset);

// Get current vertical scroll position and position the nav. ribbon accordingly
var curr_scroll_y = window.pageYOffset;
nav_ribbon.style.position = "fixed";
nav_ribbon.style.top = top_offset.toString() + "px";

// Function to adjust the positioning on the nav. ribbon
function adjustPosition() {
	curr_scroll_y = window.pageYOffset;
	nav_ribbon.style.top = Math.max(top_offset - curr_scroll_y, 0).toString() + "px";	
}

/* When the page is scrolled, update the position of the nav. ribbon relative to the viewport */
window.addEventListener("scroll", adjustPosition);
window.addEventListener("wheel", adjustPosition);

/* When the parent element of the nav. ribbon is resized, do the following*/
/* NOTE: window.resize may also be viable (and is supported by more browsers).
However, that doesn't seem to get triggered when html and body are always set to 100vh in CSS
and content before the nav. ribbon is added (such as when pressing a section button in works_listing.html). */
const ribbon_parent_resize_observer = new ResizeObserver(
	function(entries) {
		for (let entry of entries) {
			// Update top_offset
			console.log("resized");
			top_offset = dummy_div.offsetTop;
			console.log("dummy_div offsetTop: " + dummy_div.offsetTop);

			// Update the nav. ribbon and dummy div element
			adjustPosition();
			nav_ribbon.style.maxWidth = ribbon_parent.offsetWidth.toString() + "px";
			dummy_div.style.height = nav_ribbon.offsetHeight.toString() + "px";
		}
	}
);

// Attach resize observer to the parent element of the nav. ribbon
ribbon_parent_resize_observer.observe(ribbon_parent);
