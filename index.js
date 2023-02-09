
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

/*fetch('https://favqs.com/api/qotd')
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("quote").innerHTML += `
            <p class="quote">${data.quote.body}</p>
        `
    })
    .catch(err => console.error(err))*/

function getCurrentTime() {
    const date = new Date()
    const hour = date.getHours()
    const actualDate = date.toLocaleDateString("de-DE");
    const actualTime = date.toLocaleTimeString("en-us", {timeStyle: "short"})
    const timeOfDay = hour >=0 && hour <12 ? "Good Morning" 
        : hour >=12 && hour <18 ? "Good Afternoon"
        : "Good Evening"
    document.getElementById("time").innerHTML = `
        <h1 class="time">${actualTime} <span>on the</span> ${actualDate}</h1>
        <h2 class="expression">${timeOfDay}</h2>
    `
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

//TO DO LIST

const myInput = document.getElementById("my-input")
const listBtn = document.getElementById("list-btn")
const listItems = document.getElementById("list-items")
const deleteBtn = document.querySelector('.done-btn')

const myList = []

listBtn.addEventListener('click', addListItems)
deleteBtn.addEventListener('click', deleteListItems)


//ADD TO LIST ARRAY
function addListItems(e){
    e.preventDefault()

    myList.push({name: myInput.value, 
                id:(new Date()).getTime(),
                isDone: false})

    
    myInput.value=''
    renderHtml()
}

//CREATE HTML ELEMENTS TO RENDER TO THE PAGE
function renderHtml(){
    let html=""
    myList.forEach(item => {
        html += `
                    <div class="list-item" data-key=${item.id}>
                        <li>${item.name}</li>
                        <button class="done-btn" id=${item.id}>Done</button>
                    </div>
                `
        })
    listItems.innerHTML = html
}

// DELETE ITEM FROM LIST
function deleteListItems(e){
 myList.map(item => {
    if (item.id == e.target.id){
        const indexOfItem = myList.indexOf(item)
        myList.splice(indexOfItem, 1)
    }
 })
 renderHtml()
}



