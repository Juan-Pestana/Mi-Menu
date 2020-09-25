


class ApiHandler {
    constructor() {
            this.axiosServer = axios.create({
                     baseURL: 'https://mi-menu.herokuapp.com/api',
                    // baseURL: 'http://localhost:3000/api' 
            })
    }
getLocalitation(data){
    // console.log('esto es lo que le metemos a AXIOS', data)
return this.axiosServer.post("/restaurants",data)
}
getOrders(){
    return this.axiosServer.post("/orders")
}
}





