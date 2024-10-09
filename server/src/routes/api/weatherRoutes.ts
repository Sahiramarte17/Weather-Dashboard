import { Request, Response, Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // Save city to search history
    await HistoryService.addCity(cityName);

    // Respond with the weather data
    return res.json(weatherData);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (__: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await HistoryService.removeCity(id);
    res.json({ message: 'City removed from search history' });
  } catch (error) {
    console.error('Error deleting city:', error);
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;

