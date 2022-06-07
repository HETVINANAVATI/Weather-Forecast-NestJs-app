import { Query, Controller, Get, Param, Render } from '@nestjs/common';
import { appendFile } from 'fs';
import { WeatherForecastService } from './weather_forecast.service';
@Controller('/')
export class WeatherForecastController {
  constructor(private weatherService: WeatherForecastService) {}
  @Get('/')
  @Render('index')
  forFeature() {
    return { title: 'Weather', name: 'Hetvi' };
  }

  @Get('/Weather')
  public getHomePage(@Query() query) {
    const address = query.address;
    return this.weatherService.getHomePage(address);
  }
  @Get('/About')
  @Render('about')
  forRoot() {
    return { title: 'About Me', name: 'Hetvi' };
  }
  @Get('/*')
  @Render('404')
  for() {
    return {
      title: 'Error 404',
      name: 'Hetvi',
      errorMessage: 'No such page found',
    };
  }
}
