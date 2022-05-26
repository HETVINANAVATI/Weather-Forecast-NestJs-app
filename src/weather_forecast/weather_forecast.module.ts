import { Module } from '@nestjs/common';
import { WeatherForecastController } from './weather_forecast.controller';
import { WeatherForecastService } from './weather_forecast.service';

@Module({
  controllers: [WeatherForecastController],
  providers: [WeatherForecastService]
})
export class WeatherForecastModule {}
