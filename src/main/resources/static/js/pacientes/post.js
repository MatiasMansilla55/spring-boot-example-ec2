window.addEventListener("load", function () {
  //Al cargar la pagina buscamos y obtenemos el formulario donde estarán
  //los datos que el usuario cargará del nuevo paciente
  const formulario = document.querySelector("#add_new_paciente");

  //Ante un submit del formulario se ejecutará la siguiente funcion
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    //creamos un JSON que tendrá los datos del nuevo paciente
    const formData = {
      nombre: document.querySelector("#nombre").value,
      apellido: document.querySelector("#apellido").value,
      dni: document.querySelector("#dni").value,
      fechaIngreso: document.querySelector("#fechaIngreso").value,
      domicilioEntradaDto: {
        calle: document.querySelector("#calle").value,
        numero: document.querySelector("#numero").value,
        localidad: document.querySelector("#localidad").value,
        provincia: document.querySelector("#provincia").value,
      },
    };

    //invocamos utilizando la función fetch la API estudiantes con el método POST
    //que guardará al estudiante que enviaremos en formato JSON
    const url = "http://localhost:8081/pacientes/registrar";
    const settings = {
      method: "POST",
      mode: "cors",
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
        //Si no hay ningun error se muestra un mensaje diciendo que el paciente
        //se agrego bien
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El paciente ha sido guardado con exito",
          showConfirmButton: false,
          timer: 1500,
        });
        let successAlert =
          '<div class="alert alert-success alert-dismissible">' +
          '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
          "<strong></strong> Estudiante agregado </div>";

        document.querySelector("#response").innerHTML = successAlert;
        document.querySelector("#response").style.display = "block";
        //se dejan todos los campos vacíos por si se quiere ingresar otro paciente
        resetUploadForm();
      })
      .catch((error) => {
        //Si hay algun error se muestra un mensaje diciendo que el paciente
        //no se pudo guardar y se intente nuevamente
        console.log(error);
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
        //se dejan todos los campos vacíos por si se quiere ingresar otro paciente
        resetUploadForm();
      });
  });

  function resetUploadForm() {
    document.querySelector("#nombre").value = "";
    document.querySelector("#apellido").value = "";
    document.querySelector("#dni").value = "";
    document.querySelector("#fechaIngreso").value = "";
    document.querySelector("#calle").value = "";
    document.querySelector("#numero").value = "";
    document.querySelector("#localidad").value = "";
    document.querySelector("#provincia").value = "";
  }

  (function () {
    let pathname = window.location.pathname;
    if (pathname === "/") {
      document.querySelector(".nav .nav-item a:first").addClass("active");
    } else if (pathname == "/pacientesList.html") {
      document.querySelector(".nav .nav-item a:last").addClass("active");
    }
  })();
});
