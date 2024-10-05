import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import searchHistory from '../../db/searchHistory.json' assert { type: 'json' };
// Define a City class with name and id properties
class City {

  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}



let searchPath: string = JSON.parse(searchHistory);
/*
fs.readFile('../../db/searchHistory.json', 'utf8')
  .then(data => {
    console.log("Data: ", data);
    console.log("Type: ", typeof data);
    let jsData = JSON.parse(data);
    console.log("JS: ", jsData);

  })
  .catch(err => {
    console.log("Err: ", err);
    throw Error(err);
  })
*/
// Complete the HistoryService class
class HistoryService {
  filePath: string;

  constructor() {
  //  this.filePath = '../../db/searchHistory.json'; // Adjust path as needed
    this.filePath = searchPath; // Adjust path as needed
  }

  // Define a read method that reads from the searchHistory.json file
  async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading from file:', error);
      return []; // Return an empty array if there's an error
    }
  }

  // Define a write method that writes the updated cities array to the searchHistory.json file
  async write(cities: []) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const citiesData = await this.read();
    return citiesData.map(( cityData: { name: string, id: string } ) => new City(cityData.name, cityData.id)); // Convert plain objects to City instances
  }

  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string) {
    const cities = await this.read();
    const newCity = new City(cityName, uuidv4()); // Create a new City instance with a unique ID
    cities.push(newCity);
    await this.write(cities);
  }

  // BONUS: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    let cities = await this.read();
    cities = cities.filter((city: { id: string }) => city.id !== id); // Filter out the city with the matching ID
    await this.write(cities);
  }
}

export default new HistoryService();