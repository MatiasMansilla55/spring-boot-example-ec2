FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/clinica-odontologica-0.0.1-SNAPSHOT.jar clinica-odontologica-0.0.1-SNAPSHOT.jar
EXPOSE 8081
CMD ["java", "-jar","clinica-odontologica-0.0.1-SNAPSHOT.jar"]