function initMap() {
    document.querySelector('#buscar').addEventListener('click', buscar) 

    if (navigator.geolocation) {

        const map = new google.maps.Map(document.querySelector('#restaurantsMap'), {
            zoom: 15,
            center: { lat: 0, lng : 0},

        })

        let center = {}

        //getCurrentPosition(successCallback, failureCallback)
        navigator.geolocation.getCurrentPosition(
            position => {

                console.log(position)
                center = { lat: position.coords.latitude, lng: position.coords.longitude }
                map.setCenter(center)
                new google.maps.Marker({ map, position: center })
            },
            err => console.log('No se pudo acceder a la localización:', err)
        )

    } else {
        console.log('Unable to reach geolocation module')
    }
}