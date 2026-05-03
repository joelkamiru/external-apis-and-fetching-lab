// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

document.addEventListener("DOMContentLoaded", function() {
    const stateInput = document.getElementById("state-input");
    const fetchButton = document.getElementById("fetch-alerts");
    const alertsDisplay = document.getElementById("alerts-display");
    const errorMessage = document.getElementById("error-message");
    
    const summaryMessage = document.createElement("p");
    const alertList = document.createElement("ul");
    alertsDisplay.appendChild(summaryMessage);
    alertsDisplay.appendChild(alertList);

    const spinner = document.getElementById("loading-spinner");

    function showLoading() {
         if (spinner)
             spinner.style.display = 'block';
             }
    function hideLoading() {
         if (spinner)
             spinner.style.display = 'none';
             }

    function clearUI() {
        summaryMessage.textContent = "";
        alertList.innerHTML = "";
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden"); 
    }

    async function fetchWeatherAlerts() {
        const state = stateInput.value.trim().toUpperCase();

        if (state.length !== 2 || !isNaN(state)) {
            throw new Error("");
        }

        clearUI();
        stateInput.value = ""; 
        showLoading();

        const response = await fetch(weatherApi + state);
        
        if (!response.ok) {
            throw new Error("Unable to find alerts for that location.");
        }

        const data = await response.json();
        const features = data.features;

        hideLoading();

        if (features.length === 0) {
            summaryMessage.textContent = `No active alerts for ${state}.`;
        } else {
            summaryMessage.textContent = `Weather Alerts: ${features.length}`;
            
            features.forEach(alert => {
                const li = document.createElement("li");
                li.textContent = alert.properties.headline;
                alertList.appendChild(li);
            });
        }
    }

    fetchButton.addEventListener("click", function() {
        fetchWeatherAlerts().catch(errorObject => {
            hideLoading(); 
            errorMessage.textContent = errorObject.message;
            errorMessage.classList.remove("hidden"); 
        });
    });
});