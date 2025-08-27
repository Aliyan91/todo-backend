import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
    const todos = getTodos.all(req.userId);
    res.json(todos);

});

router.post("/", (req, res) => {
    const {task} = req.body;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id , task) VALUES (? , ?)`);
    const result = insertTodo.run(req.userId , task);
    res.json({id : result.lastInsertRowid , task , completed: 0});
});

router.put("/:id", (req, res) => {
    const {task , completed} = req.body;
    const {id} = req.params;
    const updateTodo = db.prepare(`UPDATE todos SET task = ? , completed = ? WHERE id = ? AND user_id = ?`);
    const result = updateTodo.run(task , completed , id , req.userId);
    if(result.changes === 0){
        return res.status(404).json({message : "Todo not found"});
    }
    res.json({id , task , completed});
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
    const result = deleteTodo.run(id , req.userId);
    if(result.changes === 0){
        return res.status(404).json({message : "Todo not found"});
    }
    res.json({message : "Todo deleted successfully"});
 });

export default router;

