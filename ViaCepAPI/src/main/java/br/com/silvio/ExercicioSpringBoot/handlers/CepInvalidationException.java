package br.com.silvio.ExercicioSpringBoot.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CepInvalidationException extends RuntimeException {
    public CepInvalidationException(String cep) {
        super("CEP inválido: " + cep + ". Deve conter  exatamente 8 dígitos numéricos.");
    }
}
