import { Todo } from "../entities/Todo"

export interface TodoRepository {
    GetTodo(): any
    RemoveTodo(todo: Todo): Todo
    AddTodo(todo: Todo): Todo
    EditTodo(todo: Todo): Todo
    MarkCompleteTodo(todo: Todo): Todo
    GetDays(todo: Todo): Todo
}
