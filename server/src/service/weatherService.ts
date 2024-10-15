
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number


  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date=date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF=tempF;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private city: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.API_KEY || '';
    this.city = '';
  }
// Fetch location data using the OpenWeather Geocoding API
private async fetchLocationData(query: string): Promise<any> {
  this.city = query
  const url = this.buildGeocodeQuery();
  const response = await axios.get(url);
  return response.data[0];  // Assuming the first result is the most relevant
}
// Destructure and return the lat and lon coordinates from the API response
private destructureLocationData(locationData: any): Coordinates {
  const { lat, lon } = locationData;
  return { lat, lon };
}

// Build the URL for the geocoding query
private buildGeocodeQuery(): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
}

// Build the URL for the weather query using the coordinates
private buildWeatherQuery(coordinates: Coordinates): string {
  return `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
}
// Fetch and destructure the coordinates based on the city name
private async fetchAndDestructureLocationData(): Promise<Coordinates> {
  const locationData = await this.fetchLocationData(this.city);
  return this.destructureLocationData(locationData);
}

// Fetch the weather data using coordinates
private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
  const url = this.buildWeatherQuery(coordinates);
  const response = await axios.get(url);
  return response.data;


}
 // Parse the current weather from the API response
  private parseCurrentWeather(currentWeather: any): Weather {
    //const currentWeather = response.list[0]; // Assume the first in the list is the current weather
    const tempF = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind.speed;
    const iconDescription = currentWeather.weather[0].description;
    const icon = currentWeather.weather[0].icon;
    const date=currentWeather.dt_txt

    return new Weather(this.city,date,icon,iconDescription, tempF, windSpeed, humidity);
  }
  // Build an array of forecast data
  private buildForecastArray(weatherData: any[]): Weather[] {
    return weatherData.map((entry: any) => this.parseCurrentWeather(entry))
  }
// Main method: Get weather for the city, including current and future conditions
async getWeatherForCity(query: string): Promise<Weather[] > {
  this.city = query
  const coordinates = await this.fetchAndDestructureLocationData();
  const weatherData = await this.fetchWeatherData(coordinates);

  const currentWeather = this.parseCurrentWeather(weatherData.list[0]);
  const forecast = this.buildForecastArray(weatherData.list.slice(1, 6)); // Next 5-day forecast
console.log (currentWeather)
console.log (forecast)
  return [
    currentWeather,
    ...forecast
  ];
}
}

// (async () => {
//   const weatherService = new WeatherService('New York');
//   const weatherData = await weatherService.getWeatherForCity();

//   console.log('Current Weather:', weatherData.currentWeather);
//   console.log('5-Day Forecast:', weatherData.forecast);
// })();

export default new WeatherService();







  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method

