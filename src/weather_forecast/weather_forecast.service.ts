import { Injectable } from '@nestjs/common';
import {geocode} from '../utils/geocode'
import {forecast} from '../utils/forecast'
@Injectable()
export class WeatherForecastService {
    public  getHomePage(address:string)
    {
        if(!address)
        {
            return ({"error":"You must provide an address"});
        }
       //  geocode(address,(error: any,{latitude,longitude ,location}={})=>{
        geocode(address,(error: any,body:any)=>{
            if(error)
            {
                return ({error});
            }
            forecast(body.latitude,body.longitude,(error: any,datas: any)=>{
                if(error)
                {
                    return ({error});
                }
                return ({
                location,   
                forecast: datas,
                address: address})
            })
        })     
    } 
    public getHome(){
        return "About Me";
    }
    
}

