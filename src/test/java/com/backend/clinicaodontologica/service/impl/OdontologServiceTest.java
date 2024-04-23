package com.backend.clinicaodontologica.service.impl;

import com.backend.clinicaodontologica.dto.entrada.odontologo.OdontologoEntradaDto;

import com.backend.clinicaodontologica.dto.salida.odontologo.OdontologoSalidaDto;


import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest

class OdontologServiceTest {
    @Autowired
    private OdontologService odontologService;

    @Test
    @Order(1)
    void testAdeberiaRegistrarUnOdontologoConUnId() {

        OdontologoEntradaDto odontologoEntradaDto = new OdontologoEntradaDto(1234,"Sebastian","Rodriguez");

        OdontologoSalidaDto odontologoSalidaDto = odontologService.registrarOdontologo(odontologoEntradaDto);

        assertNotNull(odontologoSalidaDto.getId());
        assertEquals("Sebastian", odontologoSalidaDto.getNombre());

    }

    @Test
    @Order(2)
    void testBdeberiaRetornarUnaListaNoVacia() {

        // Lista los pacientes y verifica que la lista no esté vacía
        List<OdontologoSalidaDto> odontologos = odontologService.listarOdontologo();
        assertFalse(odontologos.isEmpty());

    }

    @Test
    @Order(3)
    void testCdeberiaRetornarUnOdontologoConIdIgualA1() {



        OdontologoSalidaDto odontologoSalidaDto = odontologService.buscarOdontologoPorId(1L);
        assertFalse(odontologoSalidaDto.getId()!=1);
    }



}