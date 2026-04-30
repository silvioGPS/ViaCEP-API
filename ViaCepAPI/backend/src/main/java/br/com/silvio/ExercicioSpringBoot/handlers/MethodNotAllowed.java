package br.com.silvio.ExercicioSpringBoot.handlers;

public class MethodNotAllowed extends RuntimeException {
    public MethodNotAllowed(String method) {

        super("This API was consumed only to return GET/{cep} methods. Method " + method + " not allowed." );
    }
}
