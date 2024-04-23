window.addEventListener('load', function () {

    //Buscamos y obtenemos el formulario donde estan
    //los datos que el usuario pudo haber modificado del turno
    const formulario = document.querySelector('#update_turno_form');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        let turnoId = document.querySelector('#turno_id').value;

        //creamos un JSON que tendrá los datos del turno
        //a diferencia de un turno nuevo en este caso enviamos el id
        //para poder identificarlo y modificarlo para no cargarlo como nuevo
        const formData = {
                id: document.querySelector('#turno_id').value,
                fechaYHora: document.querySelector('#fechaYHora').value,
                //odontologoModificacionEntradaDto:{
                //nombre:document.querySelector('#nombre_odontologo').value,
                //apellido:document.querySelector('#apellido_odontologo').value,

                //},
               //pacienteModificacionEntradaDto: {
                //nombre: document.querySelector('#nombre_paciente').value,
               //apellido: document.querySelector('#apellido_paciente').value,
                //}

              };

        //invocamos utilizando la función fetch la API turnos con el método PUT
        //que modificará al turno que enviaremos en formato JSON
        const url = 'http://localhost:8081/turnos/actualizar';
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
          fetch(url,settings)
          .then(response => response.json())
            .then(data => {
                      // Actualizar la fila en la tabla con los nuevos datos
                      updateTableRow(data);
                  })
                  .catch(error => {
                      alert("Error: " + error);
                  });

    })
 })

 function updateTableRow(turno) {
     const trId = 'tr_' + turno.id;
     const turnoRow = document.getElementById(trId);

     turnoRow.querySelector('.td_date').textContent = turno.fechaYHora;
     //turnoRow.querySelector('.td_first_name_paciente').textContent = turno.paciente ? turno.paciente.nombre : '';
     //turnoRow.querySelector('.td_last_name_paciente').textContent = turno.paciente ? turno.paciente.apellido : '';
     //turnoRow.querySelector('.td_first_name_odontologo').textContent = turno.odontologo ? turno.odontologo.nombre : '';
     //turnoRow.querySelector('.td_last_name_odontologo').textContent = turno.odontologo ? turno.odontologo.apellido : '';
 }


    //Es la funcion que se invoca cuando se hace click sobre el id de un turno del listado
    //se encarga de llenar el formulario con los datos del turno
    //que se desea modificar
    window.findBy = function findBy(id) {
          const url = '/turnos/buscarId'+"/"+id;
          const settings = {
              method: 'GET'
          }
          fetch(url,settings)
          .then(response => response.json())
          .then(data => {
              let turno = data;
              document.querySelector('#turno_id').value = turno.id;
              document.querySelector('#fechaYHora').value = turno.fechaYHora;
              //document.querySelector('#nombre_paciente').value = turno.paciente.nombre;
              //document.querySelector('#apellido_paciente').value = turno.paciente.apellido;
              //document.querySelector('#nombre_odontologo').value = turno.odontologo.nombre;
              //document.querySelector('#apellido_odontologo').value = turno.odontologo.apellido;

            //el formulario por default esta oculto y al editar se habilita
              document.querySelector('#div_turno_updating').style.display = "block";
          }).catch(error => {
              alert("Error: " + error);
          })
      }