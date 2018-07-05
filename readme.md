- start server (npm start)  
- get all todo items  
curl http://localhost:3000/api/v1/todos  
- create new todo item  
curl -d '{"text":"task1", "complete":false}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/v1/todos  
- update todo item  
curl -d '{"text":"task1", "complete":true}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/v1/todos/{id}  
- delete todo item  
curl -X DELETE http://localhost:3000/api/v1/todos/{id}