// List of Indian states and their capitals
const indianStates = {
    'Andhra Pradesh': 'Amaravati',
    'Arunachal Pradesh': 'Itanagar',
    'Assam': 'Dispur',
    'Bihar': 'Patna',
    'Chhattisgarh': 'Raipur',
    'Goa': 'Panaji',
    'Gujarat': 'Gandhinagar',
    'Haryana': 'Chandigarh',
    'Himachal Pradesh': 'Shimla',
    'Jharkhand': 'Ranchi',
    'Karnataka': 'Bengaluru',
    'Kerala': 'Thiruvananthapuram',
    'Madhya Pradesh': 'Bhopal',
    'Maharashtra': 'Mumbai',
    'Manipur': 'Imphal',
    'Meghalaya': 'Shillong',
    'Mizoram': 'Aizawl',
    'Nagaland': 'Kohima',
    'Odisha': 'Bhubaneswar',
    'Punjab': 'Chandigarh',
    'Rajasthan': 'Jaipur',
    'Sikkim': 'Gangtok',
    'Tamil Nadu': 'Chennai',
    'Telangana': 'Hyderabad',
    'Tripura': 'Agartala',
    'Uttar Pradesh': 'Lucknow',
    'Uttarakhand': 'Dehradun',
    'West Bengal': 'Kolkata'
};

// Weather images mapping
const weatherImages = {
    'sunny': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&auto=format&fit=crop',
    'cloudy': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop',
    'rainy': 'https://images.unsplash.com/photo-1501691223387-dd0506c89ac8?w=800&auto=format&fit=crop',
    'partly cloudy': 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=800&auto=format&fit=crop',
    'clear': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop'
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Handle search functionality
function handleSearch() {
    const stateName = searchInput.value.trim();
    
    if (!stateName) {
        showError('Please enter a state name');
        return;
    }

    const capital = indianStates[stateName];
    if (!capital) {
        showError('Please enter a valid Indian state name');
        return;
    }

    try {
        const weatherData = generateDummyWeatherData(capital);
        displayWeatherInfo(weatherData, stateName, capital);
        hideError();
    } catch (error) {
        showError('Error generating weather data. Please try again.');
    }
}

// Generate dummy weather data
function generateDummyWeatherData(city) {
    // Generate random weather conditions
    const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'];
    const weatherDescription = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    // Generate random temperature between 15 and 40 degrees Celsius
    const temperature = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
    
    // Generate random feels like temperature (within ±2 degrees of actual temperature)
    const feelsLike = temperature + Math.floor(Math.random() * 5) - 2;
    
    // Generate random humidity between 40 and 90 percent
    const humidity = Math.floor(Math.random() * (90 - 40 + 1)) + 40;
    
    // Generate random wind speed between 0 and 30 km/h
    const windSpeed = Math.floor(Math.random() * 31);

    return {
        main: {
            temp: temperature,
            feels_like: feelsLike,
            humidity: humidity
        },
        wind: {
            speed: windSpeed
        },
        weather: [{
            description: weatherDescription.toLowerCase(),
            icon: getWeatherIcon(weatherDescription)
        }]
    };
}

// Get weather icon based on condition
function getWeatherIcon(condition) {
    const icons = {
        'Sunny': '01d',
        'Cloudy': '04d',
        'Rainy': '10d',
        'Partly Cloudy': '02d',
        'Clear': '01d'
    };
    return icons[condition] || '01d';
}

// Get weather image URL
function getWeatherImage(description) {
    return weatherImages[description.toLowerCase()] || weatherImages['clear'];
}

// Display weather information
function displayWeatherInfo(data, stateName, capital) {
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const weatherImageUrl = getWeatherImage(weatherDescription);

    weatherInfo.innerHTML = `
        <h2>${stateName} (${capital})</h2>
        <img src="${weatherImageUrl}" alt="${weatherDescription}" class="weather-image">
        <div class="weather-details">
            <div class="weather-detail">
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
                <p><strong>Weather:</strong> ${weatherDescription}</p>
            </div>
            <div class="weather-detail">
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
            </div>
        </div>
    `;
    
    weatherInfo.classList.add('active');
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
    weatherInfo.classList.remove('active');
}

// Hide error message
function hideError() {
    errorMessage.classList.remove('active');
} 