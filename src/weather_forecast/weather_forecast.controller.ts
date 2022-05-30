import { Query, Controller, Get, Param, Render } from '@nestjs/common';
import { WeatherForecastService } from './weather_forecast.service';
@Controller('/')
export class WeatherForecastController {
  constructor(private weatherService: WeatherForecastService) {}
  @Get('/')
  @Render('index')
  root() {
    return { title: 'Weather', name: 'Hetvi' };
  }
  @Get('/Weather')
  public getHomePage(@Query() query) {
    const address = query.address;
    return this.weatherService.getHomePage(address);
  }
  @Get('/About')
  public getHome() {
    return this.weatherService.getHome();
  }
}
