package br.com.silvio.ExercicioSpringBoot.services;

import br.com.silvio.ExercicioSpringBoot.models.Endereco;
import br.com.silvio.ExercicioSpringBoot.utils.CepValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ViaCepService {

    @Autowired
    WebClient viaCepWebClient;

    public Endereco buscarEndereco(String cep) {

        CepValidation.validar(cep); //Validação antes de chamar a API

        String cepLimpo = cep.replaceAll("-", "");

        return viaCepWebClient.get()
                .uri("/{cep}/json/", cep)
                .retrieve()
                .bodyToMono(Endereco.class)
                .block();
    }

    public Endereco buscarEnderecoSync(String cep) {
        return buscarEndereco(cep);
    }


}
