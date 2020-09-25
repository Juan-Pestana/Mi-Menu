// const router = require("../../routes/api.routes")
// ApiHandler= new ApiHandler()



function initMap() {
    // document.querySelector('#buscar').addEventListener('click', buscar) 
    if (navigator.geolocation) {
        const map = new google.maps.Map(document.querySelector('#restaurantsMap'), {
            zoom: 15,
            center: { lat: 0, lng: 0 },
        })
        let center = {}
        //getCurrentPosition(successCallback, failureCallback)
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position)
                center = { lat: position.coords.latitude, lng: position.coords.longitude }

                ApiHandler.getLocalitation(center)
                    .then(response => drawMap(response.data))
                    .catch(err => next(err))


                map.setCenter(center)
                new google.maps.Marker({ map, position: center })
            },
            
        )
    } else {
        document.write('Unable to reach geolocation module')
    }
}

