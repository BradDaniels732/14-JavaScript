// Initialize some variables.  First, the dataset.
var tableData = data;

// Find the location for the table of data
var ufoTable = d3.select(".table-body");

// Find the location for the list of date choices
var dateChoices = d3.select("#dateList");

// Find the location for the list of city choices
var cityChoices = d3.select("#cityList");

// Find the location for the list of state choices
var stateChoices = d3.select("#stateList");

// Find the location for the list of country choices
var countryChoices = d3.select("#countryList");

// Find the location for the list of shape choices
var shapeChoices = d3.select("#shapeList");

// Create a variable for the Reset Filters button
var resetFilterButton = d3.select("#filter-btn");

// Initialize these variables here, so they are "global" and available to all functions
var filterDate = "All Dates";
var filterCity = "All Cities";
var filterState = "All States";
var filterCountry = "All Countries";
var filterShape = "All Shapes";

// Run the "clearFilter" function, as this will populate the table for the user and set the filters to "All"
clearFilter();
// The user is off and running.  This is the end of the main section of code.


// Now, for all the functions

function clearFilter() {
// Reset all the global variables
  filterDate = "All Dates";
  filterCity = "All Cities";
  filterState = "All States";
  filterCountry = "All Countries";
  filterShape = "All Shapes";

  // doTheSearch
  doTheSearch();
}

// The following is run when the user selects the date from the drop-down choices
function selectDate() {
  // Find the date that was selected
  var mylist = document.getElementById("dateList");
  filterDate = mylist.options[mylist.selectedIndex].text;

  // Do The Search!
  doTheSearch();
};

// The following is run when the user selects the city from the drop-down choices
function selectCity() {
  var mylist = document.getElementById("cityList");
  filterCity = mylist.options[mylist.selectedIndex].text;
  doTheSearch();
};

// The following is run when the user selects the state from the drop-down choices
function selectState() {
  var mylist = document.getElementById("stateList");
  filterState = mylist.options[mylist.selectedIndex].text;
  doTheSearch();
};

// The following is run when the user selects the country from the drop-down choices
function selectCountry() {
  var mylist = document.getElementById("countryList");
  filterCountry = mylist.options[mylist.selectedIndex].text;
  doTheSearch();
};

// The following is run when the user selects the shape from the drop-down choices
function selectShape() {
  var mylist = document.getElementById("shapeList");
  filterShape = mylist.options[mylist.selectedIndex].text;
  doTheSearch();
};

// When the "Reset All Filters" button is clicked, run the "clearFilter" function
resetFilterButton.on("click", clearFilter);


// This is the function that takes the current user inputs, filters the data and presents it on the screen.
function doTheSearch() {

  // Filter the data through all the search criteria one-by-one.  Since I have to always check for the "All Dates/Locations/Shapes", I will
  // need "if" statemments for each filter.  If there was a way to do this with one long filter statement, I'd do that, but I'm not sure
  // how do do that.

  // Always start with the entire dataset
  var filteredData = tableData;

  // Filter by date
  if (filterDate != "All Dates") {
    filteredData = filteredData.filter(sighting => sighting.datetime === filterDate);
  };

  // Filter by city
  if (filterCity != "All Cities") {
    filteredData = filteredData.filter(sighting => sighting.city === filterCity);
  };

  // Filter by state
  if (filterState != "All States") {
    filteredData = filteredData.filter(sighting => sighting.state === filterState);
  };

  // Filter by country
  if (filterCountry != "All Countries") {
    filteredData = filteredData.filter(sighting => sighting.country === filterCountry);
  };

  // Now filter by shape
  if (filterShape != "All Shapes") {
    filteredData = filteredData.filter(sighting => sighting.shape === filterShape);
  };

  // remove any previous information in the ufoTable
  ufoTable.html("");

  // load the filtered data into the table
  filteredData.forEach((ufoReport) => {
    var row = ufoTable.append("tr");

    // Fortunately, the column headings are in the same order as the keys
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

  // Now, reset all the filter options

  // DATES
  // Find the unique dates in "filteredData" and load that info into the search criteria
  var uniqueDates = [...new Set(filteredData.map(x => x.datetime))];

  // remove any previous information for the date choices
  dateChoices.html("");

  //Give the user a choice of "all dates", then the list of unique dates
  dateChoices.append("option").text("Choose from...");
  dateChoices.append("option").text("All Dates");
  uniqueDates.forEach((uniqueDate) => dateChoices.append("option").text(uniqueDate));

  // CITIES
  // Find the unique cities in "filteredData" and load that info into the search criteria
  var uniqueCities = [...new Set(filteredData.map(x => x.city))];

  // Sort them alphabetically
  uniqueCities.sort();

  // remove any previous information for the city choices
  cityChoices.html("");

  //Give the user a choice of "all cities", then the list of unique cities
  cityChoices.append("option").text("Choose from...");
  cityChoices.append("option").text("All Cities");
  uniqueCities.forEach((uniqueCity) => cityChoices.append("option").text(uniqueCity));

  // STATES
  // Find the unique states in "filteredData" and load that info into the search criteria  
  var uniqueStates = [...new Set(filteredData.map(x => x.state))];

  // Sort them alphabetically
  uniqueStates.sort();

  // remove any previous information for the state choices
  stateChoices.html("");

  //Give the user a choice of "all states", then the list of unique states
  stateChoices.append("option").text("Choose from...");  
  stateChoices.append("option").text("All States");
  uniqueStates.forEach((uniqueState) => stateChoices.append("option").text(uniqueState));

  // COUNTRIES  
  // Find the unique countries in "filteredData" and load that info into the search criteria
  var uniqueCountries = [...new Set(filteredData.map(x => x.country))];

  // Sort them alphabetically
  uniqueCountries.sort();

  // remove any previous information for the country choices
  countryChoices.html("");

  //Give the user a choice of "all countries", then the list of unique countries
  countryChoices.append("option").text("Choose from...");
  countryChoices.append("option").text("All Countries");
  uniqueCountries.forEach((uniqueCountry) => countryChoices.append("option").text(uniqueCountry));

  // SHAPES
  // Find the unique shapes in "filteredData" and load that info into the search criteria
  var uniqueShapes = [...new Set(filteredData.map(x => x.shape))];

  // Sort them alphabetically
  uniqueShapes.sort();

  // remove any previous information for the shape choices
  shapeChoices.html("");
 
  //Give the user a choice of "all shapes", then the list of unique shapes
  shapeChoices.append("option").text("Choose from...");
  shapeChoices.append("option").text("All Shapes");
  uniqueShapes.forEach((uniqueShape) => shapeChoices.append("option").text(uniqueShape));  
};

// THE END