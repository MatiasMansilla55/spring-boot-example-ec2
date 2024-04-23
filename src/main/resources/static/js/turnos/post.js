window.addEventListener("load", function () {
  //Al cargar la pagina buscamos y obtenemos el formulario donde estarán
  //los datos que el usuario cargará del nuevo turno
  const formulario = document.querySelector("#add_new_turno");
  
  //Ante un submit del formulario se ejecutará la siguiente funcion
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    //creamos un JSON que tendrá los datos del nuevo turno
    const formData = {
      fechaYHora: document.querySelector("#fecha").value,
      paciente: {
        id: document.querySelector("#id_paciente").value,
        nombre: document.querySelector("#nombre_paciente").value,
        apellido: document.querySelector("#apellido_paciente").value,
        dni: document.querySelector("#dni").value,
        fechaDeIngreso: document.querySelector("#fechaDeIngreso").value,
        domicilio: {
          id: document.querySelector("#id_domicilio").value,
          calle: document.querySelector("#calle").value,
          numero: document.querySelector("#numero_calle").value,
          localidad: document.querySelector("#localidad").value,
          provincia: document.querySelector("#provincia").value,
        },
      },
      odontologo: {
        id: document.querySelector("#id_odontologo").value,
        matricula: document.querySelector("#matricula").value,
        nombre: document.querySelector("#nombre_odontologo").value,
        apellido: document.querySelector("#apellido_odontologo").value,
      },
    };

    //invocamos utilizando la función fetch la API turnos con el método POST
    //que guardará al turno que enviaremos en formato JSON
    const url = "http://localhost:8081/turnos/registrar";
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(url, settings)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        //Si no hay ningun error se muestra un mensaje diciendo que el turno
        //se agrego bien
       
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El turno ha sido guardado con exito",
          showConfirmButton: false,
          timer: 1500,
        });
        let successAlert =
          '<div class="alert alert-success alert-dismissible">' +
          '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
          "<strong></strong> Turno agregado </div>";

        document.querySelector("#response").innerHTML = successAlert;
        document.querySelector("#response").style.display = "block";
        //se dejan todos los campos vacíos por si se quiere ingresar otro turno
        resetUploadForm();
      })
      .catch((error) => {
        //Si hay algun error se muestra un mensaje diciendo que el turno
        //no se pudo guardar y se intente nuevamente
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error, intente nuevamente",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        let errorAlert =
          '<div class="alert alert-danger alert-dismissible">' +
          '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
          "<strong> Error intente nuevamente</strong> </div>";

        document.querySelector("#response").innerHTML = errorAlert;
        document.querySelector("#response").style.display = "block";
        //se dejan todos los campos vacíos por si se quiere ingresar otro turno
        resetUploadForm();
      });
  });

  function resetUploadForm() {
    document.querySelector("#fecha").value = "";
    document.querySelector("#id_paciente").value = "";
    document.querySelector("#nombre_paciente").value = "";
    document.querySelector("#apellido_paciente").value = "";
    document.querySelector("#dni").value = "";
    document.querySelector("#fechaDeIngreso").value = "";
    document.querySelector("#id_domicilio").value = "";
    document.querySelector("#calle").value = "";
    document.querySelector("#numero_calle").value = "";
    document.querySelector("#localidad").value = "";
    document.querySelector("#provincia").value = "";
    document.querySelector("#id_odontologo").value = "";
    document.querySelector("#matricula").value = "";
    document.querySelector("#nombre_odontologo").value = "";
    document.querySelector("#apellido_odontologo").value = "";
  }

  (function () {
    let pathname = window.location.pathname;
    if (pathname === "/") {
      document.querySelector(".nav .nav-item a:first").addClass("active");
    } else if (pathname == "/turnosList.html") {
      document.querySelector(".nav .nav-item a:last").addClass("active");
    }
  })();
});
