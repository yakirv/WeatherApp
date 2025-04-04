import { ui } from '..'

export class ApiHandler {
    constructor() {
        this.locationName = document.getElementById('location-name')
        this.maxTemp = document.getElementById('max-temp')
        this.getNextDaysWeather()
        this.getTodayWeather()
        this.getTomorrowWeather()
    }
    getCurrentTime() {
        const currentTime = new Date()
        // const hour = `${currentTime.getHours()}:00:00`
        return currentTime.getHours()
    }
    async getNextDaysWeather() {
        const url =
            'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/petah%20tikva?unitGroup=metric&include=days&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json'
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

    async getTodayWeather() {
        const currentHour = this.getCurrentTime()
        const url =
            'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/petah%20tikva?unitGroup=metric&include=hours&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json'
        try {
            const response = await fetch(url, {
                mode: 'cors',
            })

            const todayHourly = await response.json()
            ui.newMyLocationObject(todayHourly)

            const hoursData = Array.from(todayHourly.days[0].hours)
            const dayDate = todayHourly.days[0].datetime

            for (let i = 0; i <= hoursData.length; i++) {
                if (i >= currentHour) {
                    ui.todaydataDetailed(hoursData[i], dayDate)
                }
            }
        } catch (error) {}
    }
    async getTomorrowWeather() {
        const url =
            'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/petah%20tikva/tomorrow?unitGroup=metric&include=hours&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json'
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
}
