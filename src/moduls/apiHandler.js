import { ui } from '..'
import { eventHandler } from '..'

export class ApiHandler {
    constructor() {
        this.locationName = document.getElementById('location-name')
        this.maxTemp = document.getElementById('max-temp')
        //  this.getNextDaysWeather()
        //this.getTodayWeather('london')
        // this.getTomorrowWeather()
    }
    getCurrentTime() {
        const currentTime = new Date()
        // const hour = `${currentTime.getHours()}:00:00`
        return currentTime.getHours()
    }
    async getNextDaysWeather(location) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json`
        try {
            const response = await fetch(url, {
                mode: 'cors',
            })
            const weatherData = await response.json()

            const nextDays = Array.from(weatherData.days)

            for (let i = 1; i < nextDays.length; i++) {
                ui.dayObject(nextDays[i])
            }
        } catch (error) {}
    }

    async getTodayWeather(location, locationName) {
        const currentHour = this.getCurrentTime()
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=hours&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json`
        try {
            const response = await fetch(url, {
                mode: 'cors',
            })

            const todayHourly = await response.json()
            ui.newMyLocationObject(todayHourly, locationName)

            const hoursData = Array.from(todayHourly.days[0].hours)
            const dayDate = todayHourly.days[0].datetime

            for (let i = 0; i <= hoursData.length; i++) {
                if (i >= currentHour) {
                    ui.todaydataDetailed(hoursData[i], dayDate)
                }
            }
        } catch (error) {}
    }
    async getTomorrowWeather(location) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/tomorrow?unitGroup=metric&include=hours&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json`
        try {
            const response = await fetch(url, {
                mode: 'cors',
            })

            const tomorrow = await response.json()
            const dayDate = tomorrow.days[0].datetime
            const data = Array.from(tomorrow.days[0].hours)
            for (let i = 0; i < data.length; i++) {
                ui.todaydataDetailed(data[i], dayDate)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async searchLocation(location) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=hours&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json`
        try {
            const response = await fetch(url, {
                mode: 'cors',
            })
            const data = await response.json()

            return data
        } catch (error) {
            console.error(error)
        }
    }

    async getLocationName(latitude, longitude) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=he`

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'MyWheatherApp/1.0', // Required by Nominatim usage policy
            },
            mode: 'cors',
        })
        try {
            const data = await response.json()
            const city = data.address.city
            const country = data.address.country

            return { city, country }
        } catch {}
    }
}
