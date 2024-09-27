import { Router } from 'express';
import fs from 'fs/promises';

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  router.post('/', async (req, res) => {
    const cityName = req.body.city; // Extract city name from request body
  
    try {
    // TODO: GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);

  // TODO: save city to search history
  await HistoryService.addCity(cityName);

// TODO: GET search history
router.get('/history', async (req, res) => {
  const cities = await HistoryService.getCities(); // Get cities from history service
  res.json(cities); // Respond with cities as JSON
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch search history' });
}
});

 // Respond with weather data
 res.json(weatherData);
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch weather data' });
}
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const id = req.params.id; // Get the city ID from request parameters

  try {
    await HistoryService.removeCity(id); // Remove city using history service
    res.status(204).send(); // Respond with no content status
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city' });
  }
});

export default router;
