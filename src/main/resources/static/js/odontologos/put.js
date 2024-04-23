window.addEventListener("load", function () {
  const formulario = document.getElementById("update_odontologo_form");
  formulario.addEventListener("submit", function (event) {
    let odontologoId = document.getElementById("odontologo_id").value;

    const formData = {
      id: odontologoId,
      matricula: document.getElementById("matricula").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
    };

    const url = "http://localhost:8081/odontologos/actualizar";
    const settings = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(url, settings).then((response) => response.json());
  });

  window.findBy = function (id) {
    const url = "http://localhost:8081/odontologos/buscarId/" + id;
    const settings = {
      method: "GET",
    };

    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        let odontologo = data;
        document.getElementById("odontologo_id").value = odontologo.id;
        document.getElementById("matricula").value = odontologo.matricula;
        document.getElementById("nombre").value = odontologo.nombre;
        document.getElementById("apellido").value = odontologo.apellido;

        document.getElementById("div_odontologo_updating").style.display =
          "block";
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };
});
