


class ApiHandler {
    constructor() {
            this.axiosServer = axios.create({
                    baseURL: 'http://localhost:3000/api' 
            })
    }
getLocalitation(data){
    // console.log('esto es lo que le metemos a AXIOS', data)
return this.axiosServer.post("/restaurants",data)
}
}



// document.addEventListener('onload', function(event){
//     coordinates = {}

//     navigator.geolocation.getCurrentPosition(
//     position => {

//        lat = position.coords.latitude
//        lng = position.coords.longitude
//         coordinates = { lng: position.coords.longitude, lat: position.coords.latitude }
//         // console.log('1.0 coordenadas', coordinates)
//         // ApiHandler.getLocalitation(coordinates)
        
        
//     },
//     err => console.log('No se pudo acceder a la localización:', err)

// )

//     // axios.post('/api/updateLocation')
//     // axios.post(`/api/restaurants/${coordinates}`)
//     // .then(response => drawMap(response.data))
//     // .catch(err => console.log('Hubo un error:', err))


// })