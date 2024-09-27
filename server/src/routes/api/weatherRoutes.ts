
import express, {type Request, type Response} from 'express'
import WeatherService from '../../service/weatherService.js';
import HistoryService from '../../service/historyService.js';

const router = express.Router ();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
 //const { New York, Denver, Saetle, Orlando } = req.body;
  console.log("Incoming Data: ", req.body);
 const { cityName } = req.body;
  try {
 
    // GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    console.log('Data: ', weatherData)
    // Save city to search history
    await HistoryService.addCity(cityName);

    // Respond with weather data
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities(); // Get cities from history service
    res.json(cities); // Respond with cities as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

// BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const id = req.params.id; // Get the city ID from request parameters

  try {
    await HistoryService.removeCity(id); // Remove city using history service
    res.status(204).send(); // Respond with no content status
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city' });
  }
});

export default router;