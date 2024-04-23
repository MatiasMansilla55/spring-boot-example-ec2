window.addEventListener('load', function () {

    (function(){
      //con fetch invocamos a la API de pacientes con el método GET
      //nos devolverá un JSON con una colección de estudiantes
      const url = 'http://localhost:8081/pacientes/listar';
      const settings = {
        method: 'GET',
        mode:'cors',
    }
    fetch(url,settings)
    .then(response => response.json())
    .then(data => {
         //recorremos la colección de pacientes del JSON
         for(paciente of data){
          //por cada estudiante armaremos una fila de la tabla
          //cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos
          //el paciente

          let table = document.getElementById("pacienteTable");
          let pacienteRow =table.insertRow();
          let tr_id = 'tr_' + paciente.id;
          pacienteRow.id = tr_id;


          //por cada paciente creamos un boton delete que agregaremos en cada fila para poder eliminar la misma
          //dicho boton invocara a la funcion de java script deleteByKey que se encargará
          //de llamar a la API para eliminar al paciente
           let deleteButton = '<button' +
                                      ' id=' + '\"' + 'btn_delete_' + paciente.id + '\"' +
                                      ' type="button" onclick="deleteBy('+paciente.id+')" class="btn btn-danger btn_delete">' +
                                      '&times' +
                                      '</button>';

           //por cada paciente creamos un boton que muestra el id y que al hacerle clic invocará
           //a la función de java script findBy que se encargará de buscar al estudiante que queremos
           //modificar y mostrar los datos del mismo en un formulario.
          let updateButton = '<button' +
                                      ' id=' + '\"' + 'btn_id_' + paciente.id + '\"' +
                                      ' type="button" onclick="findBy('+paciente.id+')" class="btn btn-info btn_id">' +
                                      paciente.id +
                                      '</button>';


          //armamos cada columna de la fila
          //como primer columna pondremos el boton modificar
          //luego los datos del paciente
          //como ultima columna el boton eliminar
         pacienteRow.innerHTML = '<td>' + updateButton + '</td>' +
                              '<td class=\"td_first_name\">' + paciente.nombre.toUpperCase() + '</td>' +
                              '<td class=\"td_last_name\">' + paciente.apellido.toUpperCase() + '</td>' +
                              '<td>' + deleteButton + '</td>';

        };
        
})
.catch(error => {
  console.error('Error en la solicitud fetch:', error);
});
})

(function(){
  let pathname = window.location.pathname;
  if (pathname == "/pacientesList.html") {
      document.querySelector(".nav .nav-item a:last").classList.add("active");
  }
})


})