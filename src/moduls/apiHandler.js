import { ui } from '..'

export class ApiHandler {
    constructor() {
        this.locationName = document.getElementById('location-name')
        this.maxTemp = document.getElementById('max-temp')
        this.getWeather()
    }

    async getWeather() {
        const url =
            'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/petah%20tikva?unitGroup=metric&include=days&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json'
        try {
            const response = await fetch(url, { mode: 'cors' })
            const weatherData = await response.json()
            ui.newMyLocationObject(weatherData)
        } catch {}
    }
}
