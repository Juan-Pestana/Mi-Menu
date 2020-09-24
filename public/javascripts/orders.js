ApiHandler = new ApiHandler()


window.addEventListener('load', ()=>{

    console.log('hola')

    ApiHandler.getOrders()
    .then(response => {

        console.log(response)
        let text = ''
        response.data.forEach(elem =>{
            text += `<div class="d-flex justify-content-between" >
            <div>
                <p>primero :${elem.starter}</p>
                <p>segundo :${elem.main}</p> 
                <p>postre :${elem.dessert}</p>  
            </div>
            <div> 
                <p> precio: ${elem.price}€</p>  
            </div>
        </div>
        <hr>` 
            

        
    })

    document.querySelector('#lista').innerHTML = text

})

})