# 📮 ViaCEP API Consumer — Spring Boot

A Spring Boot REST API that consumes the public [ViaCEP](https://viacep.com.br/) service to fetch Brazilian address data by ZIP code (CEP).

---

## 🚀 Technologies

- Java 17
- Spring Boot 3.4.0
- Spring Web (RestTemplate)
- Spring WebFlux (WebClient)
- Maven

---

## 📁 Project Structure

```
src/main/java/br/com/silvio/ExercicioSpringBoot/
├── config/
│   └── AppConfig.java           # RestTemplate and WebClient beans
├── controllers/
│   └── EnderecoController.java  # REST endpoints
├── handlers/
│   ├── GlobalExceptionHandler.java  # Global exception handler
│   └── MethodNotAllowed.java        # Custom exception for unsupported methods
├── models/
│   └── Endereco.java            # Address model
├── services/
│   └── ViaCepService.java       # Business logic and API call
└── utils/
    └── CepValidator.java        # CEP format validation
```

---

## ⚙️ How to Run

### Prerequisites
- Java 17+
- Maven 3.8+

### Steps

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo.git

# Navigate to the project folder
cd your-repo

# Run the application
./mvnw spring-boot:run
```

The application will start at `http://localhost:8080`.

---

## 📡 Endpoints

### ✅ GET — Fetch address by CEP

```
GET /enderecos/{cep}
```

**Example:**
```
GET http://localhost:8080/enderecos/01310100
```

**Success Response (200 OK):**
```json
{
    "cep": "01310-100",
    "logradouro": "Avenida Paulista",
    "complemento": "de 1 a 610 - lado par",
    "bairro": "Bela Vista",
    "localidade": "São Paulo",
    "uf": "SP"
}
```

**Invalid CEP Response (400 Bad Request):**
```json
{
    "erro": "CEP inválido",
    "mensagem": "CEP inválido: 123. Deve conter exatamente 8 dígitos numéricos."
}
```

**CEP Not Found Response (404 Not Found):**
```
No body
```

---

### ❌ Unsupported Methods

This API is **read-only**. Any attempt to use POST, PUT or DELETE will return:

```
POST/PUT/DELETE /enderecos/{cep}
```

**Response (405 Method Not Allowed):**
```json
{
    "erro": "Método não permitido",
    "mensagem": "This API was consumed only to return GET/{cep} methods. Method POST not allowed.",
    "uso correto": "GET /enderecos/{cep}"
}
```

---

## 🛡️ Validations

| Input | Result |
|---|---|
| `01310100` | ✅ Valid — fetches address |
| `01310-100` | ✅ Valid — removes dash and fetches |
| `0131` | ❌ 400 Bad Request — invalid CEP |
| `abc12345` | ❌ 400 Bad Request — invalid CEP |
| ` ` (empty) | ❌ 400 Bad Request — invalid CEP |

---

## 🔗 External API

This project consumes the public **ViaCEP** API:

```
https://viacep.com.br/ws/{cep}/json/
```

> ViaCEP is a free, public API and does not require authentication.
> It supports **GET requests only**.

---

## 👨‍💻 Author

Made by **Silvio Henrique**
