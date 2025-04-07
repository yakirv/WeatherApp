import { apiHandler } from '..'
import { ui } from '..'

export class EventHandler {
    searchButton
    searchField
    myLocationContianer
    message

    constructor() {
        this.searchButton = document.getElementById('search-button')
        this.searchField = document.getElementById('search')
        this.myLocationContianer = document.getElementById(
            'location-card-container'
        )
        this.message = document.getElementById('error-message')
        this.clickSearch()
        this.getlocation()
    }
    clickSearch() {
        this.searchButton.addEventListener('click', async () => {
            this.myLocationContianer.style.display = 'flex'
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
                this.successCallback,
                errorCallback,
                {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                    timeout: 5000,
                }
            )
        } else {
            alert('Geolocation is not supported by your browser.')
        }

        async function errorCallback(error) {
            const message = document.getElementById('error-message')
            console.error('Error callback is running')
            message.style.display = 'flex'
        }
    }
    async successCallback(position) {
        const message = document.getElementById('error-message')
        const myLocationContianer = document.getElementById(
            'location-card-container'
        )
        myLocationContianer.style.display = 'flex'
        message.style.display = 'none'
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const locationName = await apiHandler.getLocationName(
            latitude,
            longitude
        )
        const locationNameformated = `${locationName.city}, ${locationName.country}`
        const queryParam = `${latitude}%2C%20${longitude}`

        apiHandler.getTodayWeather(queryParam, locationNameformated)
        apiHandler.getNextDaysWeather(queryParam)
        apiHandler.getTomorrowWeather(queryParam)
    }
}
