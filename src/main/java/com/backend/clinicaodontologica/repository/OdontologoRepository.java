package com.backend.clinicaodontologica.repository;

import com.backend.clinicaodontologica.entity.Odontologo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OdontologoRepository extends JpaRepository<Odontologo, Long> {

    //@Query(value = "SELECT * FROM PACIENTES WHERE DNI = ?1", nativeQuery = true)
    //@Query("SELECT Paciente p FROM Paciente WHERE p.dni = ?1")

}