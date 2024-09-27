# Weather-Dashboard
The Weather Dashboard is a web application designed to help travelers check the weather outlook for multiple cities. By entering a city name, users can view current and future weather conditions, helping them plan their trips accordingly.

## User Story

**AS A** traveler  
**I WANT** to see the weather outlook for multiple cities  
**SO THAT** I can plan a trip accordingly  

## Acceptance Criteria

- **GIVEN** a weather dashboard with form inputs  
  **WHEN** I search for a city  
  **THEN** I am presented with current and future conditions for that city, and that city is added to the search history.  

- **WHEN** I view current weather conditions for that city  
  **THEN** I am presented with the city name, the date, an icon representation of weather conditions, a description of the weather for the icon's `alt` tag, the temperature, the humidity, and the wind speed.  

- **WHEN** I view future weather conditions for that city  
  **THEN** I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.  

- **WHEN** I click on a city in the search history  
  **THEN** I am again presented with current and future conditions for that city.  

## Features

- Search for weather data by city name.
- View and manage search history.
- Delete entries from search history.
- Responsive design with a clean user interface.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap, 
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: JSON file for storing search history
- **API**: OpenWeatherMap API for weather data
- **Development Tools**: Nodemon, Concurrently

## Getting Started


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
