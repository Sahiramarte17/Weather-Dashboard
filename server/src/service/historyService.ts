// TODO: Define a City class with name and id properties
class City {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
// TODO: Complete the HistoryService class
class HistoryService {
constructor() {
      this.filePath = './server/db/searchHistory.json'; // Adjust path as needed
    }
  // TODO: Define a read method that reads from the searchHistory.json file
  async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading from file:', error);
      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  async write(cities) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read();
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName) {
    const cities = await this.read();
    const newCity = new City(cityName, uuidv4()); // Create a new City instance with a unique ID
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id) {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id); // Filter out the city with the matching ID
    await this.write(cities);
  }
}

export default new HistoryService();
