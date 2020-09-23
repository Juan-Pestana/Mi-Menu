let map
const buscar = () => {
    axios.get('/api/restaurants')
        .then(response => drawMap(response.data))
        .catch(err => console.log('Hubo un error:', err))

}



function drawMap(restaurants) {

    map = new google.maps.Map(document.querySelector('#restaurantsMap'),
        {
            center: { lat: 0, lng: 0 },
            zoom: 17
        })

            //getCurrentPosition(successCallback, failureCallback)
            navigator.geolocation.getCurrentPosition(
                position => {
                    center = { lat: position.coords.latitude, lng: position.coords.longitude }
                    map.setCenter(center)
                    new google.maps.Marker({ map, position: center })
                },
                err => console.log('No se pudo acceder a la localización:', err)
            )} 
    

    restaurants.forEach(elm => {

        let center = {
            lat: elm.location.coordinates[1],
            lng: elm.location.coordinates[0]
        }

        new google.maps.Marker({ map, position: center })
    })

   map.setCenter({ lat: restaurants[0].location.coordinates[1], lng: restaurants[0].location.coordinates[0] })

