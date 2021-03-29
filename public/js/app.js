    //read imput
    const weatherForm = document.querySelector('form')
    const search = document.querySelector('input') // access o imput (search)
    const messageOne = document.querySelector('#message-1') 
    const messageTwo = document.querySelector('#message-2')

   // messageOne.textContent = 'test'

    weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()//previnir que a pagina refresh (e)


    const location = search.value // extract search

    //console.log(location) (this will just show location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error

            } else {
                messageOne.textContent = data.Location, data.latitude
                messageTwo.textContent = data.forecast
            console.log(data.Location)
            console.log(data.forecast)
            }
        })
    })
    
})
