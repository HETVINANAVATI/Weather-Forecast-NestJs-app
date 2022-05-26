import { Module } from '@nestjs/common';
import { WeatherForecastModule } from './weather_forecast/weather_forecast.module';

@Module({
  imports: [WeatherForecastModule]
})
export class AppModule {}
