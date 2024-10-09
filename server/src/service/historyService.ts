import { promises as fs } from 'fs';  // For reading and writing files
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs
import path from 'path';

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath = path.join(__dirname, 'searchHistory.json');

  // Read method: Reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist or is empty, return an empty array
      return [];
    }
  }

  // Write method: Writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing to file', error);
    }
  }

  // getCities method: Returns an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }

// addCity method: Adds a city to the searchHistory.json file
async addCity(cityName: string): Promise<City> {
  const cities = await this.read();
  const newCity = new City(uuidv4(), cityName);
  cities.push(newCity);
  await this.write(cities);
  return newCity;
}

// BONUS: removeCity method: Removes a city by ID from the searchHistory.json file
async removeCity(id: string): Promise<boolean> {
  const cities = await this.read();
  const updatedCities = cities.filter(city => city.id !== id);

  if (cities.length === updatedCities.length) {
    // No city was removed, ID was not found
    return false;
  }

  await this.write(updatedCities);
  return true;
}
}
  
  // Export the HistoryService class
export default HistoryService;
  
  
  
  
  
  
  
  // TODO: Define a read method that reads from the searchHistory.json file
 // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
