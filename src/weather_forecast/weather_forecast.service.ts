import { Body, ConsoleLogger, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { json } from 'stream/consumers';
import axios from 'axios';

@Injectable()
export class WeatherForecastService {
  constructor(private httpService: HttpService) {}
  public geocode(address, callback) {
    const url1 =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      address +
      '.json?access_token=pk.eyJ1IjoiaGV0dmkxOCIsImEiOiJjbDNjeHoybmMwMm1nM2tsNXJtYmo3YmV0In0.jKczdsE7FBnxxMYN0pq0lA&limit=1';

    axios
      .get(url1)
      .then((res) => {
        if (res.data.features.length === 0)
          callback('Unable to find loacation', undefined);
        else
          callback(undefined, {
            latitude: res.data.features[0].center[1],
            longitude: res.data.features[0].center[0],
            location: res.data.features[0].place_name,
          });
      })
      .catch((err) => {
        callback('Check Connection', undefined);
      });
  }
  public forecast(lat, long, callback) {
    const url =
      'http://api.weatherstack.com/current?access_key=5c596fae2ef19e7e7c15acb601af9bd3&query=' +
      lat +
      ',' +
      long +
      '&units=f';
    axios
      .get(url)
      .then((res) => {
        if (res.data.error) {
          callback('Unable to find location', undefined);
        } else
          callback(
            undefined,
            'Current_Temperature:' +
              res.data.current.temperature +
              ',Current_Weather_description:' +
              res.data.current.weather_descriptions +
              ',Current_chances_to_Rain:' +
              res.data.current.precip,
          );
      })
      .catch((err) => {
        callback('Check Connection', undefined);
      });
  }

  public getHomePage(address: string) {
    return new Promise((resolve) => {
      if (!address) {
        return resolve({ error: 'You must provide an address' });
      }
      this.geocode(
        address,
        (error: any, { latitude = 0, longitude = 0, location = {} } = {}) => {
          if (error) {
            return resolve({ error });
          }
          this.forecast(latitude, longitude, (error: any, datas: any) => {
            if (error) {
              return resolve({ error });
            }
            return resolve({
              location,
              forecast: datas,
              address: address,
            });
          });
        },
      );
    });

    // return { location: address };
  }
}
