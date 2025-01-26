const apiKey = 'f45bff249d8179ef2baa0c8dde9f048c'; // Replace with your OpenWeatherMap API key
        
        async function getWeather() {
            const cityInput = document.getElementById('city-input');
            const city = cityInput.value;

            if (!city) {
                alert('Please enter a city name');
                return;
            }

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                );

                if (!response.ok) {
                    throw new Error('City not found');
                }

                const data = await response.json();

                // Update UI with weather data
                document.getElementById('city').textContent = data.name;
                document.getElementById('temperature').textContent = 
                    `${Math.round(data.main.temp)}°C`;
                document.getElementById('description').textContent = 
                    data.weather[0].description;
                document.getElementById('humidity').textContent = 
                    `${data.main.humidity}%`;
                document.getElementById('wind').textContent = 
                    `${Math.round(data.wind.speed)} km/h`;

            } catch (error) {
                alert(error.message);
            }
        }

        // Allow search with Enter key
        document.getElementById('city-input').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                getWeather();
            }
        });