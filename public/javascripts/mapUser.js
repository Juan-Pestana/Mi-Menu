// const router = require("../../routes/api.routes")
// ApiHandler= new ApiHandler()



function initMap() {
    document.querySelector('#buscar').addEventListener('click', buscar) 
    if (navigator.geolocation) {
        const map = new google.maps.Map(document.querySelector('#restaurantsMap'), {
            zoom: 15,
            center: { lat: 0, lng : 0},
        })
        var center = {}
        //getCurrentPosition(successCallback, failureCallback)
        navigator.geolocation.getCurrentPosition(
            position => {
                center = { lat: position.coords.latitude, lng: position.coords.longitude }

                ApiHandler.getLocalitation(center)
                .then(response => drawMap(response.data))
                // .catch(err => console.log('Hubo un error:', err))


                map.setCenter(center)
                new google.maps.Marker({ map, position: center })
            },
            err => console.log('No se pudo acceder a la localización:', err)
        )
    } else {
        console.log('Unable to reach geolocation module')
    }
}

