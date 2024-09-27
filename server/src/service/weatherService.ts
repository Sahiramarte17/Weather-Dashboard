import dotenv from 'dotenv';
dotenv.config();
//import { Coordinates } from './path/to/your/types';
import axios from 'axios';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number | undefined;
  lon: number | undefined;
  coord?: {
      lat?: number;
      lon?: number;
  };
}


// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public temperature: number,
    public humidity: number,
    public windSpeed: number,
    public description: string,
    public icon: string,
    public forecast: Array<{ date: string; temperature: number; humidity: number; windSpeed: number }>
  ) {}
}

// TODO: Complete the WeatherService class

class WeatherService {
  private baseURL: string;
  private apiKey: string | undefined;



  // TODO: Define the baseURL, API key, and city name properties
  constructor(baseURL: string, apiKey: string | undefined) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response: any = await axios.get(`${this.baseURL}/weather?q=${query}&appid=${this.apiKey}&units=metric`);
    return this.destructureLocationData(response.data);
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.coord?.lat,
      lon: locationData.coord?.lon,
    }
  };
  // TODO: Create buildGeocodeQuery method
  /* --> private buildGeocodeQuery(cityName: string): string {
    return `${this.baseURL}/weather?q=${encodeURIComponent(cityName)}&appid=${this.apiKey}&units=metric`;
};
*/ 

  
    // TODO: Create buildWeatherQuery method

    private buildWeatherQuery(coordinates: Coordinates): string {
      return `${this.baseURL}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely&appid=${this.apiKey}&units=metric`;
  };

  // TODO: Create fetchAndDestructureLocationData method
// -->  private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await axios.get(this.buildWeatherQuery(coordinates));
    return response.data;
  } 
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const current = response.current;
    const forecast = this.buildForecastArray(response.daily);
    return new Weather(
      current.temp,
      current.humidity,
      current.wind_speed,
      current.weather[0].description,
      current.weather[0].icon,
      forecast
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(dailyData: any[]): Array<{ date: string; temperature: number; humidity: number; windSpeed: number }> {
    return dailyData.slice(1, 6).map(day => ({
      date: new Date(day.dt * 1000).toLocaleDateString(), // Convert UNIX timestamp to readable date
      temperature: day.temp.day,
      humidity: day.humidity,
      windSpeed: day.wind_speed,
    }));
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

const base = 'https://api.openweathermap.org';

export default new WeatherService(base, process.env.API_KEY);
