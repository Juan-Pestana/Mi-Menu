





    document.getElementById('add').addEventListener('click', function (event) {

       const primeros = document.querySelector('.primeros').value
       const segundos = document.querySelector('.segundos').value
       const postres = document.querySelector('.postres').value

       let textStarter =``
       for (let i = 0; i < primeros; i++){
           textStarter+=`<input type="text"><br>
           <select name="" id="">
               <option value="">sopa</option>
               <option value="">ensalada</option>
               <option value="">crema</option>
               <option value="">pasta</option>
               <option value="">arroz</option>
               <option value="">pescado</option>
           </select><br><br>`
       }
       document.querySelector('#starters').innerHTML = textStarter

       let textMain =``
       for (let i = 0; i < segundos; i++){
           textMain+=`<input type="text"><br>
           <select name="" id="">
               <option value="">sopa</option>
               <option value="">ensalada</option>
               <option value="">crema</option>
               <option value="">pasta</option>
               <option value="">arroz</option>
               <option value="">pescado</option>
           </select><br><br>`
       }
       document.querySelector('#main').innerHTML = textMain

       let textDesert =``
       for (let i = 0; i < postres; i++){
           textDesert+=`<input type="text"><br>
           <select name="" id="">
               <option value="">tarta</option>
               <option value="">lacteos</option>
               <option value="">fruta</option>
               <option value="">pasta</option>
               <option value="">arroz</option>
               <option value="">pescado</option>
           </select><br><br>`
       }
       document.querySelector('#dessert').innerHTML = textDesert


    });


  