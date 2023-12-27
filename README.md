# Desafio BrickUp - Documentação

## Techs Usadas:
- **Back-end:**
  - Spring Boot
  - Hibernate
  - Jackson
  - REST
- **Banco de Dados:**
  - MySQL
- **Front-end:**
  - React
  - Ant Design (Opcional)
  - Redux
  - Redux-Saga
   
## Endpoints do Controller

### GET /tasks
- **Descrição**: Retorna todas as tarefas cadastradas.
- **Método**: `GET`

### GET /tasks/{taskId}
- **Descrição**: Retorna uma tarefa específica com base no ID.
- **Método**: `GET`
- **Parâmetros**: `taskId` (UUID)

### POST /tasks
- **Descrição**: Cria uma nova tarefa.
- **Método**: `POST`
- **Parâmetros**: `title` (String), `completed` (boolean), `photoPath` (MultipartFile)

### PUT /tasks/{taskId}
- **Descrição**: Atualiza uma tarefa existente com base no ID.
- **Método**: `PUT`
- **Parâmetros**: `taskId` (UUID), `title` (String), `completed` (boolean), `photoPath` (MultipartFile)

### DELETE /tasks/{taskId}
- **Descrição**: Exclui uma tarefa com base no ID.
- **Método**: `DELETE`
- **Parâmetros**: `taskId` (UUID)

### POST /modifyStatus/{taskId}
- **Descrição**: Modifica o status de uma tarefa para concluída.
- **Método**: `POST`
- **Parâmetros**: `taskId` (UUID)
