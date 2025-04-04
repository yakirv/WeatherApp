export class UI {
    locationName
    maxTemp
    minTemp
    date
    icon
    container
    dataDetailed
    //  slides

    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.locationName = document.getElementById('location-name')
            this.maxTemp = document.getElementById('max-temp')
            this.minTemp = document.getElementById('min-temp')
            this.date = document.getElementById('location-date')
            this.container = document.getElementById('next-days-container')
            this.dataDetailed = document.getElementById('data-detailed-slides')
            this.icon = document.getElementById('icon-weather')
            this.clickSearch()
            //  this.slides = document.getElementsByClassName('today-card-detailed')
            setTimeout(() => {
                this.carousel()
            }, 3000)
        })
    }

    clickSearch() {
        const searchBtn = document.getElementById('search-button')
        searchBtn.addEventListener('click', () => {
            alert('CLicKCkCK')
        })
    }
    async loadIcon(src) {
        try {
            const icon = await import(`/src/iconsColor/${src}.png`)
            return icon.default
        } catch (error) {
            console.error(error)
            return null
        }
    }

    newMyLocationObject(weatherData) {
        this.locationName.innerText = weatherData.resolvedAddress
        this.maxTemp.innerText = `${weatherData.days[0].tempmax} °C`
        this.minTemp.innerText = `${weatherData.days[0].tempmin} °C`
        this.date.innerText = this.convertDateFormat(
            weatherData.days[0].datetime
        )
        const iconSrc = weatherData.days[0].icon
        this.loadIcon(iconSrc).then((src) => {
            this.icon.src = src
        })
    }
    dayObject(day) {
        const dayCard = document.createElement('div')
        dayCard.className = 'day-card'
        const dayDate = document.createElement('p')
        const dayMaxTemp = document.createElement('p')
        const dayMinTemp = document.createElement('p')
        const dayIcon = document.createElement('img')

        dayMaxTemp.innerText = `${day.tempmax} °C`
        dayMinTemp.innerText = `${day.tempmin} °C`
        dayDate.innerText = this.convertDateFormat(day.datetime)
        const iconSrc = day.icon
        this.loadIcon(iconSrc).then((src) => {
            dayIcon.src = src
        })
        dayCard.appendChild(dayDate)
        dayCard.appendChild(dayMaxTemp)
        dayCard.appendChild(dayMinTemp)
        dayCard.appendChild(dayIcon)

        this.container.appendChild(dayCard)
    }
    todaydataDetailed(todayData, dayDate) {
        const detailedObj = this.createDetailedcardProperties()
        const convertedDate = this.convertDateFormat(dayDate)
        detailedObj.hour.innerText = todayData.datetime
        detailedObj.date.innerText = convertedDate
        detailedObj.hourTemp.innerText = todayData.temp
        detailedObj.humidity.innerText = todayData.humidity
        const iconSrc = todayData.icon
        this.loadIcon(iconSrc).then((src) => {
            detailedObj.hourIcon.src = src
        })

        detailedObj.todayDetailed.appendChild(detailedObj.hour)
        detailedObj.todayDetailed.appendChild(detailedObj.date)
        detailedObj.todayDetailed.appendChild(detailedObj.hourTempProperty)
        detailedObj.todayDetailed.appendChild(detailedObj.hourTemp)
        detailedObj.todayDetailed.appendChild(detailedObj.humidityProperty)
        detailedObj.todayDetailed.appendChild(detailedObj.humidity)
        detailedObj.todayDetailed.appendChild(detailedObj.hourIcon)
        this.dataDetailed.appendChild(detailedObj.todayDetailed)
    }

    convertDateFormat(dateStr) {
        const date = new Date(dateStr)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0') // +1 because months are 0-indexed
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    createDetailedcardProperties() {
        const todayDetailed = document.createElement('div')
        todayDetailed.className = 'today-card-detailed'
        const hour = document.createElement('p')
        hour.className = 'hour-field'
        const date = document.createElement('p')
        const hourTempProperty = document.createElement('p')
        hourTempProperty.innerText = 'טמפ׳'
        const hourTemp = document.createElement('p')
        const humidityProperty = document.createElement('p')
        humidityProperty.innerText = 'לחות'
        const humidity = document.createElement('p')
        const hourIcon = document.createElement('img')

        const obj = {
            todayDetailed,
            hour,
            date,
            hourTempProperty,
            hourTemp,
            humidityProperty,
            humidity,
            hourIcon,
        }
        return obj
    }
    carousel() {
        const slidesContainer = document.getElementById('data-detailed-slides')
        let slides = document.getElementsByClassName('today-card-detailed')
        const prevButton = document.getElementById('carousel-button-prev')
        const nextButton = document.getElementById('carousel-button-next')
        let currentIndex = 0

        function updateCarousel() {
            slidesContainer.style.transform = `translatex(${currentIndex * 2.7}%)`
            console.log(slidesContainer.style.transform)
        }

        function goToNextSlide() {
            currentIndex = (currentIndex + 1) % slides.length
            console.log(currentIndex)
            updateCarousel()
        }

        function goToPrevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length
            console.log(currentIndex)
            updateCarousel()
        }

        nextButton.addEventListener('click', goToPrevSlide)
        prevButton.addEventListener('click', goToNextSlide)

        // Optional: Auto-play functionality
        let autoPlayInterval = setInterval(goToNextSlide, 5000)

        // Optional: Pause auto-play on hover
        slidesContainer.addEventListener('mouseenter', () =>
            clearInterval(autoPlayInterval)
        )
        slidesContainer.addEventListener(
            'mouseleave',
            () => (autoPlayInterval = setInterval(goToNextSlide, 5000))
        )

        //  Initialize carousel
        updateCarousel()
    }
}
