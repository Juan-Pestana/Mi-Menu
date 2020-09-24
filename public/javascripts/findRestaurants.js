ApiHandler = new ApiHandler()



function drawMap(restaurants) {

    map = new google.maps.Map(document.querySelector('#restaurantsMap'),
        {
            center: { lat: 0, lng: 0 },
            zoom: 17
        })

            // getCurrentPosition(successCallback, failureCallback)
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    center = { lat: position.coords.latitude, lng: position.coords.longitude }
                    // const coordinates = {lng: position.coords.longitude , lat: position.coords.latitude }
                    map.setCenter(center)
                    new google.maps.Marker({ map, position: center })


                    

                    
                },
                err => console.log('No se pudo acceder a la localización:', err)
            )

            restaurants.forEach(elm => {
                let center = {
                    lat: elm.location.coordinates[1],
                    lng: elm.location.coordinates[0]
                }
                new google.maps.Marker({ map, position: center })
            })


            } 

window.addEventListener('load', ()=>{
    // console.log(center)
    document.querySelector('#search').addEventListener('click', function (event) {
        let meters = document.querySelector('#meters').value
        center.distance = parseFloat(meters)
        ApiHandler.getLocalitation(center)
            .then(response => {

                    console.log(response.data)
                    let text = ''
                    response.data.forEach(elem =>{
                        text += `<li>
                        <a href="/user/restaurant-detail/${elem._id}"><img src=${elem.logo}>
                        <p>${elem.name}</p></a>   
                    </li>`
                })

                document.querySelector('#lista').innerHTML = text
                drawMap(response.data)
            })
    })

})







