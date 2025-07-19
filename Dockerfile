FROM openjdk:25-slim

WORKDIR /app

COPY target/app.jar .

CMD ["java", "-jar", "app.jar"]
