/**************************************************************************************************
BUTTONS FOR FILTERING BY TYPE
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

	var entries = document.querySelectorAll(CSS_elem_selector);
	for (var i = 0; i < entries.length; i++) {
		/*Get the tags of the current HTML element as an array of strings. In the
		HTML document, the tags are delimited by commas.*/
		var tag_array = entries[i].getAttribute("data-listing-tags").toString().split(",");

		/* Flag for when the current element passes through filtering by type*/
		var tag_match = false;

		/*Loop through all tags of the current element*/
		for (var tag_idx = 0; tag_idx < target_tags.length; tag_idx++) {
			if (tag_array.includes(target_tags[tag_idx])) {
				tag_match = true;
				break;
			}
		}

		/*Set visibility of current element based on whether or not at least one of
		the element's tags exist in the target tags*/
		if (tag_match) {
			entries[i].classList.remove("hidden");
		}
		else {
			entries[i].classList.add("hidden");
		}
		tag_match = false;
	}
}

/*Use event delegation on the section buttons container to filter the entries when a button is clicked*/
document.getElementById("section_buttons_container").onclick = function(e) {
	if (e.target.id != "all_entries_button" && e.target.className == "section_button") {
		/*Note: data-type-filter may have more than one word for the filter, separated by a comma*/
		filterByTag("[data-listing-tags]", e.target.getAttribute("data-type-filter").toString().split(","));

		/* If the current button has a header alias, use that on the page's title and header*/
		if(e.target.getAttribute("data-header-alias") != null) {
			document.querySelector("title").innerText = "SalilPT - My Works > " + (e.target.getAttribute("data-header-alias"));
			document.querySelector("header h1").innerText = "My Works > " + (e.target.getAttribute("data-header-alias"));
		}
		else {
			var tag_formatted = e.target.getAttribute("data-type-filter").toString().split(",")[0];

			/*Make it so page title and header describe the current filter selection*/
			tag_formatted = tag_formatted[0].toUpperCase() + tag_formatted.substring(1);
			console.log(tag_formatted);
			document.querySelector("title").innerText = "SalilPT - My Works > " + tag_formatted;
			document.querySelector("header h1").innerText = "My Works > " + tag_formatted;
		}
	}

	/*If the all entries button was clicked, make it so no entries are hidden*/
	else if (e.target.id == "all_entries_button") {
		var entries=document.querySelectorAll("[data-listing-tags]");
		for (e_idx = 0; e_idx < entries.length; e_idx++) {
			entries[e_idx].classList.remove("hidden");
		}

		/*If the all entries button was clicked, reset the page's title and header.*/
		document.querySelector("title").innerText = "SalilPT - My Works";
		document.querySelector("header h1").innerText = "My Works";
	}
}

/**************************************************************************************************
**************************************************************************************************/
