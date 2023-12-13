
/**
 * @class Autocomplete
 * @classdesc Represents an Autocomplete widget for a search bar using [leafleatjs-autocomplete]{@link https://github.com/tomickigrzegorLeaflet.Autocomplete}
 *
 * @param {string} selector - The selector of the search bar.
 * @param {Object} options - Options for configuring the Autocomplete widget.
 * @param {boolean} options.selectFirst - Whether to select the first item in the list of results by default.
 * @param {number} options.howManyCharacters - The number of characters entered before starting the search.
 * @param {Function} options.onSearch - Callback function triggered when a search is initiated.
 * @param {Object} options.onSearch.currentValue - The current value entered in the search bar.
 * @returns {Promise<Array>} A promise that resolves to an array of features.
 * @param {Function} options.onResults - Callback function triggered when search results are available.
 * @param {Object} options.onResults.currentValue - The current value entered in the search bar.
 * @param {number} options.onResults.matches - The number of matches found in the search results.
 * @param {Function} options.onResults.template - A template function for rendering the search results.
 * @returns {string} The HTML representation of the search results.
 * @param {Function} options.noResults - Callback function triggered when no search results are found.
 * @param {Object} options.noResults.currentValue - The current value entered in the search bar.
 * @param {Function} options.noResults.template - A template function for rendering a "no results" message.
 * @returns {string} The HTML representation of the "no results" message.
 *
 */


// minimal configure
new Autocomplete("destination" /*put here the selector of the searchbar*/, {
    // default selects the first item in
    // the list of results
    selectFirst: true,

    // The number of characters entered should start searching
    howManyCharacters: 2,

    // onSearch
    onSearch: ({ currentValue }) => {
        // You can also use static files
        // const api = '../static/search.json'
        const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&city=${encodeURI(
            currentValue
        )}`;


        return new Promise((resolve) => {
            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    resolve(data.features);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    },
    // nominatim GeoJSON format parse this part turns json into the list of
    // records that appears when you type.
    onResults: ({ currentValue, matches, template }) => {
        const regex = new RegExp(currentValue, "gi");

        // if the result returns 0 we
        // show the no results element
        return matches === 0
            ? template
            : matches
                .map((element) => {
                    return `
          <li class="loupe">
            <p>
              ${element.properties.display_name.replace(
                        regex,
                        (str) => `<b>${str}</b>`
                    )}
            </p>
          </li> `;
                })
                .join("");
    },



    // the method presents no results element
    noResults: ({ currentValue, template }) =>
        template(`<li>No results found: "${currentValue}"</li>`),
});
