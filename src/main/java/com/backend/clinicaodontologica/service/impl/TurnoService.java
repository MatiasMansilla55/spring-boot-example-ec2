package com.backend.clinicaodontologica.service.impl;


import com.backend.clinicaodontologica.dto.entrada.turno.TurnoEntradaDto;

import com.backend.clinicaodontologica.dto.modificacion.TurnosModificacionEntradaDto;

import com.backend.clinicaodontologica.dto.salida.odontologo.OdontologoSalidaDto;
import com.backend.clinicaodontologica.dto.salida.paciente.PacienteSalidaDto;
import com.backend.clinicaodontologica.dto.salida.turno.TurnoSalidaDto;

import com.backend.clinicaodontologica.entity.Turno;
import com.backend.clinicaodontologica.exceptions.BadRequestException;

import com.backend.clinicaodontologica.exceptions.ResourceNotFoundException;
import com.backend.clinicaodontologica.repository.TurnoRepository;
import com.backend.clinicaodontologica.utils.JsonPrinter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TurnoService implements ITurnoService {
    private final Logger LOGGER = LoggerFactory.getLogger(TurnoService.class);

    private final TurnoRepository turnoRepository;

    private final OdontologService odontologService;
    private final PacienteService pacienteService;

    private ModelMapper modelMapper;

    public TurnoService(TurnoRepository turnoRepository, OdontologService odontologService, PacienteService pacienteService, ModelMapper modelMapper) {
        this.turnoRepository = turnoRepository;
        this.odontologService = odontologService;
        this.pacienteService = pacienteService;

        this.modelMapper = modelMapper;
        configureMapping();
    }

    @Override
    public TurnoSalidaDto registrarTurno(TurnoEntradaDto turno) throws BadRequestException {
        LOGGER.info("TurnoEntradaDto: " + JsonPrinter.toString(turno));
        Turno turnoEntidad = modelMapper.map(turno, Turno.class);
        PacienteSalidaDto turnoPacienteAgendado = pacienteService.buscarPacientePorId(turnoEntidad.getPaciente().getId());
        OdontologoSalidaDto turnoOdontologoAgendado = odontologService.buscarOdontologoPorId(turnoEntidad.getOdontologo().getId());
        TurnoSalidaDto turnoSalidaDto = null;

        if (turnoPacienteAgendado != null && turnoOdontologoAgendado != null) {
            turnoRepository.save(turnoEntidad);
            turnoSalidaDto = modelMapper.map(turnoEntidad, TurnoSalidaDto.class);
            LOGGER.info("TurnoSalidaDto: " + JsonPrinter.toString(turno));
        } else if (turnoPacienteAgendado == null && turnoOdontologoAgendado != null) {
            LOGGER.error("No fue posible registrar el turno porque no se encuentra el paciente en la base de datos");
            throw new BadRequestException("No se ha encontrado el paciente");
        } else if (turnoPacienteAgendado != null && turnoOdontologoAgendado == null) {
            LOGGER.error("No fue posible registrar el turno porque no se encuentra el odontologo en la base de datos");
            throw new BadRequestException("No se ha encontrado el odontologo ");
        } else {
            LOGGER.error("No fue posible registrar el turno porque no se encuentra el paciente o el odontologo en la base de datos");
            throw new BadRequestException("No se ha encontrado el odontologo y el paciente");
        }

        return turnoSalidaDto;
    }


    @Override
        public List<TurnoSalidaDto> listarTurnos() {
            List<TurnoSalidaDto> turnosSalidaDtos = turnoRepository.findAll()
                    .stream()
                    .map(turno -> modelMapper.map(turno, TurnoSalidaDto.class))
                    .toList();
            LOGGER.info("Listado de todos los turnos: {}", JsonPrinter.toString(turnosSalidaDtos));
            return turnosSalidaDtos;
        }

        @Override
        public TurnoSalidaDto buscarTurnoPorId(Long id) {
            Turno turnoBuscado = turnoRepository.findById(id).orElse(null);
            TurnoSalidaDto turnoEncontrado = null;

            if(turnoBuscado != null){
                turnoEncontrado =  modelMapper.map(turnoBuscado, TurnoSalidaDto.class);
                LOGGER.info("Turno encontrado: {}", JsonPrinter.toString(turnoEncontrado));
            } else LOGGER.error("El id no se encuentra registrado en la base de datos");

            return turnoEncontrado;
        }

        @Override
        public void eliminarTurno(Long id)throws ResourceNotFoundException{
            if (buscarTurnoPorId(id) != null) {
                turnoRepository.deleteById(id);
                LOGGER.warn("Se ha eliminado el turno con id: {}", id);
            } else {
                LOGGER.error("No se ha encontrado el turno con id {}", id);
                throw new ResourceNotFoundException("No se ha encontrado el turno con id " + id);
            }
        }

        @Override
        public TurnoSalidaDto actualizarTurno(TurnosModificacionEntradaDto turno) {
            Turno turnoRecibido = modelMapper.map(turno, Turno.class);
            Turno turnoAActualizar = turnoRepository.findById(turnoRecibido.getId()).orElse(null);

            TurnoSalidaDto turnoSalidaDto = null;

            if (turnoAActualizar != null) {
                turnoAActualizar = turnoRecibido;
                turnoRepository.save(turnoAActualizar);

                turnoSalidaDto = modelMapper.map(turnoAActualizar, TurnoSalidaDto.class);
                LOGGER.warn("Turno actualizado: {}", JsonPrinter.toString(turnoSalidaDto));

            } else {
                LOGGER.error("No fue posible actualizar el turno porque no se encuentra en nuestra base de datos");
                //lanzar excepcion correspondiente
            }


            return turnoSalidaDto;
        }

    private void configureMapping(){
        modelMapper.typeMap(TurnoEntradaDto.class, Turno.class);

        modelMapper.typeMap(Turno.class, TurnoSalidaDto.class);


    }

}
