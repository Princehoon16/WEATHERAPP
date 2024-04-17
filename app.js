
// // // JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get the heading element
    const heading = document.getElementById('animatedHeading');
  
    // Set initial opacity to 0 and position to top of page
    gsap.set(heading, { opacity: 0, y: -100 });
  
    // Tween animation to fade in and bounce the heading
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 1.5, // Duration of the animation in seconds
      ease: "bounce.out" // Bounce easing function
    });
  
    // Create raindrop elements
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('absolute', 'w-full', 'h-full', 'overflow-hidden');
    document.body.appendChild(rainContainer);
  
    for (let i = 0; i < 20; i++) { // Create 20 raindrops
      const raindrop = document.createElement('div');
      raindrop.classList.add('raindrop', 'bg-blue-500', 'h-2', 'w-0.5', 'rounded-full', 'absolute');
      raindrop.style.left = `${Math.random() * window.innerWidth}px`; // Random horizontal position
      raindrop.style.top = `${Math.random() * -100}px`; // Random vertical position above the viewport
      rainContainer.appendChild(raindrop);
  
      // Tween animation to make raindrops fall down
      gsap.to(raindrop, {
        top: '100%',
        duration: 3, // Duration of the animation in seconds
        ease: "power1.inOut", // Easing function
        repeat: -1, // Repeat the animation indefinitely
        delay: Math.random() * 3 // Random delay for each raindrop
      });
    }
    // Disable scrolling
  document.body.style.overflow = 'hidden';

  // JavaScript

    const weatherContainer = document.getElementById('weatherCard');
    const locationInput = document.getElementById('locationInput');
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');

    function fetchWeather(location) {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=G6ZHKYBLNX5HJXPX3Y4TBC7VV&contentType=json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data); // Log the data to see its structure
  
                // Clear previous weather cards
                weatherContainer.innerHTML = '';
  
                // Loop over each day in the forecast
                data.days.forEach(day => {
                    // Create a new card for each day's forecast
                    const weatherCard = document.createElement('div');
                    weatherCard.classList.add('px-6', 'py-4', 'mb-4', 'bg-white', 'rounded-md', 'shadow-md');
  
                    weatherCard.innerHTML = `
                        <div class="font-bold text-xl mb-2">${data.resolvedAddress}, ${data.address}</div>
                        <p class="text-gray-700 text-base">
                            Date: <span class="font-semibold">${day.datetime}</span><br>
                            Temperature: <span class="font-semibold">${day.tempmax}°C / ${day.tempmin}°C</span><br>
                            Condition: <span class="font-semibold">${day.conditions}</span><br>
                            Wind Speed: <span class="font-semibold">${day.windspeed} m/s</span><br>
                            Humidity: <span class="font-semibold">${day.humidity}%</span>
                        </p>
                    `;
  
                    // Append the new card to the container
                    weatherContainer.appendChild(weatherCard);
                });
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherContainer.innerHTML = '<p class="text-red-500">Error fetching weather data. Please try again.</p>';
            });
    }

    fetchWeatherBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (location !== '') {
            fetchWeather(location);
        } else {
            alert('Please enter a valid location.');
        }
    });
  
    
  });


