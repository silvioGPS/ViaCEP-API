package br.com.silvio.ExercicioSpringBoot.utils;

import br.com.silvio.ExercicioSpringBoot.handlers.CepInvalidationException;

public class CepValidation {

    public static void validar(String cep) {
        if (cep == null || cep.isBlank()) {
            throw new CepInvalidationException(cep);
        }

        String cepLimpo = cep.replaceAll("-", "");

        if (!cepLimpo.matches("\\d{8}")) {
            throw new CepInvalidationException(cep);
        }
    }


}
