import { apiHandler } from '..'
import { ui } from '..'

export class EventHandler {
    searchButton
    searchField

    constructor() {
        this.searchButton = document.getElementById('search-button')
        this.searchField = document.getElementById('search')
        this.clickSearch()
        this.getlocation()
    }
    clickSearch() {
        this.searchButton.addEventListener('click', async () => {
            const searchValue = this.formatSearchValue(this.searchField.value)
            const apiResult = apiHandler.searchLocation(searchValue)
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

        async function errorCallback(error) {
            const latitude = '32.0723342766954'
            const longitude = '34.88852309935421'
            const locationName = await apiHandler.getLocationName(
                latitude,
                longitude
            )
            const locationNameformated = `אין הרשאות מיקום !`
            const queryParam = `${latitude}%2C%20${longitude}`
            apiHandler.getTodayWeather(queryParam, locationNameformated)
            apiHandler.getNextDaysWeather(queryParam)
            apiHandler.getTomorrowWeather(queryParam)

            /*  switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert('User denied the request for geolocation.')
                    break
                case error.POSITION_UNAVAILABLE:
                    alert('Location information is unavailable.')
                    break
                case error.TIMEOUT:
                    alert('The request to get user location timed out.')
                    break
                case error.UNKNOWN_ERROR:
                    alert('An unknown error occurred.')
                    break 
            }*/
        }
    }
}
