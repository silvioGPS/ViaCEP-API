package br.com.silvio.ExercicioSpringBoot.controllers;


import br.com.silvio.ExercicioSpringBoot.handlers.CepInvalidationException;
import br.com.silvio.ExercicioSpringBoot.handlers.MethodNotAllowed;
import br.com.silvio.ExercicioSpringBoot.models.Endereco;
import br.com.silvio.ExercicioSpringBoot.services.ViaCepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/enderecos")
@CrossOrigin(origins = "http://localhost:5173")
public class EnderecoController {

    @Autowired
    ViaCepService viaCepService;

    //GET
    @GetMapping("/{cep}")
    public ResponseEntity<?> buscaPorCep(@PathVariable("cep") String cep) {
        try {

            Endereco endereco = viaCepService.buscarEnderecoSync(cep);

            if (endereco == null || endereco.getCep() == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(endereco);

        } catch (CepInvalidationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());


        }
    }

    @PostMapping
    public ResponseEntity<?> postNotAllowed() {
        throw new MethodNotAllowed("POST");
    }

    //Put
    @PutMapping
    public ResponseEntity<?> putNotAllowed() {
        throw new MethodNotAllowed("PUT");
    }

    //Delete
    @DeleteMapping
    public ResponseEntity<?> deleteNotAllowed() {
        throw new MethodNotAllowed("DELETE");
    }


}
