import { apiHandler } from '..'
import { ui } from '..'

export class EventHandler {
    searchButton
    searchField
    mylcationContianer
    message

    constructor() {
        this.searchButton = document.getElementById('search-button')
        this.searchField = document.getElementById('search')
        this.mylcationContianer = document.getElementById(
            'location-card-container'
        )
        this.message = document.getElementById('error-message')
        this.clickSearch()
        this.getlocation()
    }
    clickSearch() {
        this.searchButton.addEventListener('click', async () => {
            this.mylcationContianer.style.display = 'flex'
            this.message.style.display = 'none'
            const searchValue = this.formatSearchValue(this.searchField.value)
            const apiResult = apiHandler.searchLocation(searchValue)
            ui.clearNextDaysCards()
            ui.newMyLocationObject(await apiResult)
            apiHandler.getNextDaysWeather(await searchValue)
            apiHandler.getTomorrowWeather(await searchValue)
        })
    }
    formatSearchValue(value) {
        const result = value.replace(/ /g, '%20')
        return result
    }

    formatLocationValue(value1, value2) {
        const result = `${value1}%2C%20${value2}`
        return result
    }

    getlocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                successCallback,
                errorCallback,
                {
                    enableHighAccuracy: true, // Try to get the most accurate location
                    timeout: 5000, // Maximum time (in milliseconds) to wait for a response
                    maximumAge: 0, // Indicates that the device should not return a cached location
                }
            )
        } else {
            alert('Geolocation is not supported by your browser.')
        }

        async function successCallback(position) {
            mylcationContianer.style.display = 'flex'
            message.style.display = 'none'
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const locationName = await apiHandler.getLocationName(
                latitude,
                longitude
            )
            const locationNameformated = `${locationName.city}, ${locationName.country}`
            const queryParam = `${latitude}%2C%20${longitude}`
            setTimeout(() => {
                apiHandler.getTodayWeather(queryParam, locationNameformated)
                apiHandler.getNextDaysWeather(queryParam)
                apiHandler.getTomorrowWeather(queryParam)
            }, 3000)
        }

        async function errorCallback(error) {
            const message = document.getElementById('error-message')
            message.style.display = 'flex'
        }
    }
}
