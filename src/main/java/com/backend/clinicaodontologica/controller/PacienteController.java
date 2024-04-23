package com.backend.clinicaodontologica.controller;

import com.backend.clinicaodontologica.dto.entrada.paciente.PacienteEntradaDto;
import com.backend.clinicaodontologica.dto.modificacion.PacienteModificacionEntradaDto;
import com.backend.clinicaodontologica.dto.salida.odontologo.OdontologoSalidaDto;
import com.backend.clinicaodontologica.dto.salida.paciente.PacienteSalidaDto;

import com.backend.clinicaodontologica.exceptions.ResourceNotFoundException;
import com.backend.clinicaodontologica.service.impl.IPacienteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/pacientes")

public class PacienteController {

    private IPacienteService pacienteService;

    public PacienteController(IPacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }


   /* @GetMapping("/buscarId")
    public String buscarPacientePorId(Model model, @RequestParam Long id){
        PacienteSalidaDto paciente = pacienteService.buscarPacientePorId(id);

        model.addAttribute("nombre", paciente.getNombre());
        model.addAttribute("apellido", paciente.getApellido());

        return "paciente";

    }
    */
   @Operation(summary = "Listado de todos los pacientes")
   @ApiResponses(value = {
           @ApiResponse(responseCode = "200", description = "Listado de pacientes obtenido correctamente",
                   content = {@Content(mediaType = "application/json",
                           schema = @Schema(implementation = PacienteSalidaDto.class))}),
           @ApiResponse(responseCode = "400", description = "Bad Request",
                   content = @Content),
           @ApiResponse(responseCode = "500", description = "Server error",
                   content = @Content)
   })


    @GetMapping("/listar")
    public ResponseEntity<List<PacienteSalidaDto>> listarPacientes(){
        return new ResponseEntity<>(pacienteService.listarPacientes(), HttpStatus.OK);
    }
    @Operation(summary = "Registro de un nuevo Paciente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Paciente guardado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = PacienteSalidaDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PostMapping("/registrar")
    public ResponseEntity<PacienteSalidaDto> guardar(@RequestBody @Valid PacienteEntradaDto paciente){
       return new ResponseEntity<>(pacienteService.registrarPaciente(paciente), HttpStatus.CREATED);
    }
    @Operation(summary = "Eliminación de un paciente por Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Paciente eliminado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "Id inválido",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @DeleteMapping("/eliminar/{id}")
    public  ResponseEntity<Void> eliminarPaciente(@PathVariable Long id)throws ResourceNotFoundException {
        pacienteService.eliminarPaciente(id);
      return new ResponseEntity<>(HttpStatus.OK);
    }



    //buscar paciente con PathVariable
    @Operation(summary = "Búsqueda de un paciente por Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Paciente obtenido correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = PacienteSalidaDto.class))}),
            @ApiResponse(responseCode = "400", description = "Id inválido",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @GetMapping("{id}")
    public ResponseEntity<PacienteSalidaDto> obtenerPacientePorId(@PathVariable Long id){
        return new ResponseEntity<>(pacienteService.buscarPacientePorId(id), HttpStatus.OK);
    }
    @Operation(summary = "Actualización de un paciente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Paciente actualizado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = PacienteSalidaDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "UServer error",
                    content = @Content)
    })
    @PutMapping("/actualizar")
    public ResponseEntity<PacienteSalidaDto> actualizarPaciente(@RequestBody PacienteModificacionEntradaDto paciente){
        return new ResponseEntity<>(pacienteService.actualizarPaciente(paciente),HttpStatus.OK);
    }

}