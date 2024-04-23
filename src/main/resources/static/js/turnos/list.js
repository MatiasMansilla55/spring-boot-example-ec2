window.addEventListener('load', function () {
    // Fetch and populate the table with turnos data
    const url = 'http://localhost:8081/turnos/listar';
    const settings = {
        method: 'GET'
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            for (turno of data) {
                let table = document.getElementById("turnoTable");
                let turnoRow = table.insertRow();
                let tr_id = 'tr_' + turno.id;
                turnoRow.id = tr_id;

                let deleteButton = '<button' +
                    ' id=' + '\"' + 'btn_delete_' + turno.id + '\"' +
                    ' type="button" onclick="deleteBy(' + turno.id + ')" class="btn btn-danger btn_delete">' +
                    '&times' +
                    '</button>';

                let updateButton = '<button' +
                    ' id=' + '\"' + 'btn_id_' + turno.id + '\"' +
                    ' type="button" onclick="findBy(' + turno.id + ')" class="btn btn-info btn_id">' +
                    turno.id +
                    '</button>';

                turnoRow.innerHTML = '<td>' + updateButton + '</td>' +
                    '<td class="td_date">' + turno.fechaYHora + '</td>' +
                    '<td class="td_first_name_paciente">' + (turno.paciente ? turno.paciente.nombre : '') + '</td>' +
                    '<td class="td_last_name_paciente">' + (turno.paciente ? turno.paciente.apellido : '') + '</td>' +
                    '<td class="td_first_name_odontologo">' + (turno.odontologo ? turno.odontologo.nombre : '') + '</td>' +
                    '<td class="td_last_name_odontologo">' + (turno.odontologo ? turno.odontologo.apellido : '') + '</td>' +
                    '<td>' + deleteButton + '</td>';
            }
        });

    // Highlight the active navigation item
    (function () {
        let pathname = window.location.pathname;
        if (pathname == "/turnosList.html") {
            document.querySelector(".nav .nav-item:last").classList.add("active");
        }
    });
});
