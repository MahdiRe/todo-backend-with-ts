import mongoose from "mongoose";

export interface ITodo { 
    title: string,
    active_state: string,
    end_date: string
}

// interface TodoModelInterface extends mongoose.Model<TodoDoc> {
//     build(attr:ITodo): TodoDoc
// }

// interface TodoDoc extends mongoose.Document {
//     title: string,
//     activeState: string,
//     endDate: string
// }

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    active_state: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
})

// todoSchema.statics.build = (attr: ITodo) => {
//     return new Todo(attr)
// }

const Todo = mongoose.model('Todo', todoSchema);

export { Todo }