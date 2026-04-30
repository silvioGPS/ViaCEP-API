// src/services/cepService.js
// Aponta para o EnderecoController: GET /enderecos/{cep}

const BASE_URL = 'http://localhost:8080';

export async function buscarEndereco(cep) {
  // Remove traço, espaços e qualquer não-dígito
  const cepLimpo = cep.replace(/\D/g, '');

  if (cepLimpo.length !== 8) {
    throw new Error('CEP deve ter exatamente 8 dígitos numéricos.');
  }

  const response = await fetch(`${BASE_URL}/enderecos/${cepLimpo}`);

  // Spring retorna 400 com mensagem de texto para CEP inválido
  if (response.status === 400) {
    const msg = await response.text();
    throw new Error(msg);
  }

  // Spring retorna 404 quando o CEP não existe na ViaCEP
  if (response.status === 404) {
    throw new Error('CEP não encontrado. Verifique e tente novamente.');
  }

  if (!response.ok) {
    throw new Error(`Erro inesperado: ${response.status}`);
  }

  return response.json(); // Retorna objeto Endereco do Java
}