let map
const buscar = () => {
    axios.get('/api/restaurants')
        .then(response => drawMap(response.data))
        .catch(err => document.write(err))

}



function drawMap(restaurants) {

    map = new google.maps.Map(document.querySelector('#restaurantsMap'),
        {
            center: { lat: 0, lng: 0 },
            zoom: 17
        }
    )

    restaurants.forEach(elm => {

        let center = {
            lat: elm.location.coordinates[1],
            lng: elm.location.coordinates[0]
        }

        new google.maps.Marker({ map, position: center })
    })

    map.setCenter({ lat: restaurants[0].location.coordinates[1], lng: restaurants[0].location.coordinates[0] })
}
