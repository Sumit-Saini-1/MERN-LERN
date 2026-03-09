const express=require("express");
const app=express();
app.use(express.json());

let todos = [{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
},
{
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
}];

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
});

app.get("/todos",(req,res)=>{
    res.json(todos);
});

app.post("/todos",(req,res)=>{
    const todo=req.body;
    todo.id=todos[todos.length-1]?.id+1||1;
    todo.completed=false;
    todo.userId=1;
    console.log(todo);
    todos.push(todo);
    res.json(todos);
});

app.delete("/todos/:id",(req,res)=>{
    const id=Number(req.params.id);
    console.log(id,"id");
    todos=todos.filter(todo=>todo?.id!==id);
    console.log(todos);
    res.json(todos);
});

app.put("/todos/:id",(req,res)=>{
    const id=Number(req.params.id);
    todos=todos.map(todo=>{
        if(todo?.id===id){
            todo.completed =req.body.completed;
        }
        return todo;
    });
    res.json(todos);
});


app.listen(3000,()=>console.log("server started"));