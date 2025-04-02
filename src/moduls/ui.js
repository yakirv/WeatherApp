export class UI {
    locationName
    maxTemp
    minTemp
    date
    icon

    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.locationName = document.getElementById('location-name')
            this.maxTemp = document.getElementById('max-temp')
            this.minTemp = document.getElementById('min-temp')
            this.date = document.getElementById('location-date')
            this.icon = document.getElementById('icon-weather')
        })
    }

    newMyLocationObject(weatherData) {
        this.locationName.innerText = weatherData.resolvedAddress
        this.maxTemp.innerText = `${weatherData.days[0].tempmax} °C`
        this.minTemp.innerText = `${weatherData.days[0].tempmin} °C`
        this.date.innerText = this.convertDateFormat(
            weatherData.days[0].datetime
        )
        const imgSrc = `/src/iconsColor/clear-day.png`
        this.icon.src = imgSrc
    }

    convertDateFormat(dateStr) {
        const date = new Date(dateStr)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0') // +1 because months are 0-indexed
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }
}
