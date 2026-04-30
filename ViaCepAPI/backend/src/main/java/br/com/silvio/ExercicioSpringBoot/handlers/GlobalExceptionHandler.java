package br.com.silvio.ExercicioSpringBoot.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Captura o erro do Spring antes de chegar no Controller
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Map<String, String>> handleMethodNotSupported(
            HttpRequestMethodNotSupportedException ex) {

        String method = ex.getMethod();

        Map<String, String> resposta = new HashMap<>();
        resposta.put("erro", "Método não permitido");
        resposta.put("mensagem", "This API was consumed only to return GET/{cep} methods. Method " + method + " not allowed.");
        resposta.put("uso correto", "GET /enderecos/{cep}");

        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(resposta);
    }
}