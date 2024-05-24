const API_URL = "https://restcountries.com/v2/all";

document.addEventListener("DOMContentLoaded", () => {
  const Countries = document.getElementById("countries");
  const searchInput = document.querySelector(".search");
  const filter = document.getElementById("filter");
  const darkMode = document.getElementById("moon");
  const header = document.getElementById("header");

  // Define a variable to keep track of the current mode
  let darkModeEnabled = false;

  darkMode.addEventListener("click", () => {
    // Toggle the value of darkModeEnabled
    darkModeEnabled = !darkModeEnabled;

    if (darkModeEnabled) {
      document.body.style.background = "hsl(207, 26%, 17%)";
      header.style.background = "hsl(207, 26%, 17%)";
      searchInput.style.background = "hsl(207, 26%, 17%)";
      filter.style.background = "hsl(207, 26%, 17%)";
      Countries.style.background = "hsl(207, 26%, 17%)";
    } else {
      document.body.style.background = "hsl(0, 0%, 98%)";
      searchInput.style.background = "hsl(0, 0%, 98%)";
      filter.style.background = "hsl(0, 0%, 98%)";
      Countries.style.background = "hsl(0, 0%, 98%)";
      searchInput.style.background = "hsl(207, 26%, 17%)";

    }
  });

  let countriesData = [];

  // Fetch countries from the API
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      countriesData = data;
      displayCountries(data);
    })
    .catch((error) => console.error("error.message"));

  // Display countries
  function displayCountries(countries) {
    Countries.innerHTML = countries
      .map(
        (country) => `
<div class="country" data-name="${country.name}">
<img src="${country.flag}" alt="Flag of ${country.name}">
<h2>${country.name}</h2>
<p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
<p><strong>Region:</strong> ${country.region}</p>
<p><strong>Capital:</strong> ${country.capital}</p>
</div>
        `
      )
      .join("");
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredCountries = countriesData.filter((country) =>
      country.name.toLowerCase().includes(searchValue)
    );
    displayCountries(filteredCountries);
  });

  // Filter functionality
  filter.addEventListener("change", () => {
    const filterValue = filter.value;
    const filteredCountries = filterValue
      ? countriesData.filter((country) => country.region === filterValue)
      : countriesData;
    displayCountries(filteredCountries);
  });

  // Handle country click to show details
  countriesContainer.addEventListener("click", (e) => {
    const countryName = e.target.closest(".country")?.dataset.name;
    if (countryName) {
      const country = countriesData.find((c) => c.name === countryName);
      showCountryDetails(country);
    }
  });

  // Show country details (simplified)
  function showCountryDetails(country) {
    const countryDetails = `
<div class="country-details">
<img src="${country.flag}" alt="Flag of ${country.name}">
<h2>${country.name}</h2>
<p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
<p><strong>Region:</strong> ${country.region}</p>
<p><strong>Capital:</strong> ${country.capital}</p>
<p><strong>Border Countries:</strong> ${
      country.borders ? country.borders.join(", ") : "None"
    }</p>
<button onclick="closeDetails()">Close</button>
</div>
        `;
    document.body.innerHTML = countryDetails;
  }

  window.closeDetails = function () {
    location.reload();
  };
});
