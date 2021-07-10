import express, { Request, Response } from "express";
import { Todo } from '../models/todo'

const router = express.Router();

// GET all todos
router.get("/", [], async (req: Request, res: Response) => {
    const todos = await Todo.find({});
    return res.status(200).send(todos);
});

// INSERT a new todo
router.post("/", async (req: Request, res: Response) => {
    console.log(req.body)
    const todo = new Todo({
        title: req.body.title,
        active_state: req.body.active_state,
        end_date: req.body.end_date
    })

    try {
        const newTodo = await todo.save()
        return res.status(201).send({
            message: "Created successfully",
            todo: newTodo
        })
    } catch {
        return res.status(400).send({
            message: "Creation failed",
            todo: null
        })
    }
});

// UPDATE a todo
router.put('/:id', async (req: Request, res:Response) => {
    var todo = []
    try {
        todo = await Todo.findById(req.params.id)
        todo.active_state = "Done"
        const newTodo = new Todo(todo)
        await newTodo.save()
        res.send("Updated successfully")
    } catch {
        if (todo == null) {
            res.send("No such todo found!")
        } else {
            res.send("Error updating the todo!")
        }
    }
})

// DELETE a todo
router.delete('/:id', async (req: Request, res: Response) => {
    var todo = new Todo({})
    try {
        todo = await Todo.findById(req.params.id)
        const newTodo = new Todo(todo)
        await newTodo.remove()
        res.send("Deleted successfully")
    } catch {
        if (todo == null) {
            res.send("No such todo found!")
        } else {
            res.send("Error deleting the todo!")
        }
    }
})

export { router as todoRouter }