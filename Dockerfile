FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY target/app.jar .

CMD ["java", "-jar", "app.jar"]
