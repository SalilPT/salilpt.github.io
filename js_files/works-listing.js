/* Enable strict mode */
"use strict";

/**************************************************************************************************
FILTERING BY TYPE
**************************************************************************************************/

/*
Function to filter elements by tag. Elements filtered out are hidden from the
document using the document's CSS file.

Parameters:
CSS_elem_selector: A string that is a valid CSS selector for the elements to filter.
target_tags: An array of strings, in which each string is a tag. When a
filtered element contains any one of the tags, it passes through the filter.
*/
function filterByTag(CSS_elem_selector, target_tags) {

	let entries = document.querySelectorAll(CSS_elem_selector);
	for (let i = 0; i < entries.length; i++) {
		// Get the tags of the current HTML element as an array of strings. In the
		// HTML document, the tags are delimited by commas.
		let tag_array = entries[i].getAttribute("data-listing-tags").toString().split(",");

		// Flag for when the current element passes through filtering by type
		let tag_match = false;

		// Loop through all tags of the current element
		for (let tag_idx = 0; tag_idx < target_tags.length; tag_idx++) {
			if (tag_array.includes(target_tags[tag_idx])) {
				tag_match = true;
				break;
			}
		}

		// Set visibility of current element based on whether or not at least one of
		// the element's tags exist in the target tags
		if (tag_match) {
			entries[i].classList.remove("hidden");
		}
		else {
			entries[i].classList.add("hidden");
		}
	}
}

/*
Function for updating the left sidebar after a section button (not "All") is clicked

Parameters:
CSS_link_selector: A string that is a valid CSS selector for the anchor elements to check and filter.
*/
function filterLeftSidebarLinks(CSS_links_selector) {

	// Get the anchor elements and then loop through them
	let links = document.querySelectorAll(CSS_links_selector);
	for (let i = 0; i < links.length; i++) {

		// If the current element doesn't have an href attribute, hide it
		if (links[i].getAttribute("href") == undefined) {
			links[i].classList.add("hidden");
			continue;
		}

		// Get the anchor link portion of the current element("#ElementID").
		// If the entry that corresponds to the anchor link exists and is not hidden, then make the current element visible.
		// Else, hide the current element.
		let split_link = links[i].getAttribute("href").split("#");
		let entry_id = split_link[split_link.length-1];
		if ((document.getElementById(entry_id) != undefined) && !document.getElementById(entry_id).classList.contains("hidden")) {
			links[i].classList.remove("hidden");
		}
		else {
			links[i].classList.add("hidden");
		}
	}
}

let current_pressed_button = undefined;

/* Use event delegation on the section buttons container to filter the entries when a button is clicked */
document.getElementById("section_buttons_container").onclick = function(e) {
	if (e.target.id != "all_entries_button" && e.target.className == "section_button") {
		// Note: data-type-filter may have more than one word for the filter, separated by a comma
		filterByTag("[data-listing-tags]", e.target.getAttribute("data-type-filter").toString().split(","));

		// If the current button has a header alias, use that on the page's title and header
		if (e.target.getAttribute("data-header-alias") != null) {
			document.querySelector("title").innerText = "SalilPT - My Works > " + (e.target.getAttribute("data-header-alias"));
			document.querySelector("header h1").innerText = "My Works > " + (e.target.getAttribute("data-header-alias"));
		}
		else {
			let tag_formatted = e.target.getAttribute("data-type-filter").toString().split(",")[0];

			// Make it so page title and header describe the current filter selection
			tag_formatted = tag_formatted[0].toUpperCase() + tag_formatted.substring(1);
			document.querySelector("title").innerText = "SalilPT - My Works > " + tag_formatted;
			document.querySelector("header h1").innerText = "My Works > " + tag_formatted;
		}

		// Set variable for currently selected filter
		if (current_pressed_button != undefined) {
			current_pressed_button.classList.remove("pressed_button");
			current_pressed_button = undefined;
		}
		current_pressed_button = e.target;
		current_pressed_button.classList.add("pressed_button");
	}

	// If the all entries button was clicked, make it so no entries are hidden
	else if (e.target.id == "all_entries_button") {
		let entries = document.querySelectorAll("[data-listing-tags]");
		for (let e_idx = 0; e_idx < entries.length; e_idx++) {
			entries[e_idx].classList.remove("hidden");
		}

		// If the all entries button was clicked, reset the page's title and header.
		document.querySelector("title").innerText = "SalilPT - My Works";
		document.querySelector("header h1").innerText = "My Works";

		// Unset current pressed button
		if (current_pressed_button != undefined) {
			current_pressed_button.classList.remove("pressed_button");
			current_pressed_button = undefined;
		}
	}

	// Update the left sidebar
	filterLeftSidebarLinks("#sidebar_left a");
}

/**************************************************************************************************
**************************************************************************************************/
