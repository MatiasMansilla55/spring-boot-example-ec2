package com.backend.clinicaodontologica.repository;

import com.backend.clinicaodontologica.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {

    //@Query(value = "SELECT * FROM PACIENTES WHERE DNI = ?1", nativeQuery = true)
    //@Query("SELECT Paciente p FROM Paciente WHERE p.dni = ?1")

}