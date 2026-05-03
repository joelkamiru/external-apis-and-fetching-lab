// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("get-alerts");
const alertDisplay = document.getElementById("alert-display");
const errorMessage = document.getElementById("error-message");
const alertList = document.getElementById("alert-list");
const summaryMessage = document.getElementById("summary-message");
const spinner = document.getElementById("loading-spinner");