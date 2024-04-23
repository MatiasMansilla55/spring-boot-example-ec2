package com.backend.clinicaodontologica.service.impl;

import com.backend.clinicaodontologica.dto.entrada.paciente.DomicilioEntradaDto;
import com.backend.clinicaodontologica.dto.entrada.paciente.PacienteEntradaDto;
import com.backend.clinicaodontologica.dto.salida.paciente.PacienteSalidaDto;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest

class PacienteServiceTest {

    @Autowired
    private PacienteService pacienteService;




    @Test
    @Order(1)
    void deberiaRegistrarUnPacienteConUnId() {

        PacienteEntradaDto pacienteEntradaDto = new PacienteEntradaDto("Juan", "Perez", 123456789, LocalDate.of(2023, 12, 24), new DomicilioEntradaDto("calle", 1234L, "Localidad", "Provincia"));

        PacienteSalidaDto pacienteSalidaDto = pacienteService.registrarPaciente(pacienteEntradaDto);

        assertNotNull(pacienteSalidaDto.getId());
        assertEquals("Juan", pacienteSalidaDto.getNombre());

    }

    @Test
    @Order(2)
    void deberiaRetornarUnaListaNoVacia() {

        // Lista los pacientes y verifica que la lista no esté vacía
        List<PacienteSalidaDto> pacientes = pacienteService.listarPacientes();
        assertFalse(pacientes.isEmpty());

    }

    @Test
    @Order(3)
    void deberiaRetornarUnPacienteConIdIgualA1() {



        PacienteSalidaDto pacienteSalidaDto2 = pacienteService.buscarPacientePorId(1L);
        assertFalse(pacienteSalidaDto2.getId()!=1);
    }

}