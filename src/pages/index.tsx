import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { DivStyle, CardStyle, InputStyle, AvatarStyle } from '../app/styles/style'
import {fetchList, addTodo, removeTodo, editTodo, markComplete} from "../app/redux/todo/todo.slice";
import {useAppDispatch, useAppSelector} from "../app/redux/hooks";
import "antd/dist/antd.css"
import { List, Divider, Input, Button, Card, Modal, Avatar } from "antd"

export default function Home() {
    const todo = useAppSelector((state) => state.todos.todo)
    const loading = useAppSelector((state) => state.todos.loading)
    const dispatch = useAppDispatch()
    const [input, setInput] = useState("")
    const [modalInput, setModalInput] = useState({ todo: "", id: "", dateCreated: "", days: "" })
    const [isModalVisible, setIsModalVisible] = useState(false)
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const addTodoClickEvent = () => {
     dispatch(addTodo({id: todo.length + 1, todo: input, complete: false }));
     setInput("")
     dispatch(fetchList())
    }
    const updateTodoClick = () => {
        dispatch(editTodo(modalInput))
        dispatch(fetchList())
    }
    const clearData = () => {
       localStorage.clear()
       dispatch(fetchList())
    }
    const markCompleteClick = (todo) => {
        dispatch(markComplete({ id: todo.id, todo: todo.todo, complete: todo.complete, dateCreated: todo.dateCreated, days: todo.days }))
        dispatch(fetchList())
    }
    const removeClick = (todo) => {
        dispatch(removeTodo(todo))
        dispatch(fetchList())
    }

    const showModal = (todo: any) => {
        setModalInput({ todo: todo.todo, id: todo.id, dateCreated: todo.dateCreated, days: todo.days })
        setIsModalVisible(true)
    }
    useEffect(() => {
        dispatch(fetchList())
    }, [dispatch])
    return (
        <div style={DivStyle}>
            <Card title="TODO LIST" bordered={true} style={CardStyle}>
                <Input
                    placeholder="Todo"
                    style={InputStyle}
                    name="todoInput"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={addTodoClickEvent} type="primary">
                    Add Todo
                </Button>
                <Button onClick={clearData} type="primary">
                    Clear Todos
                </Button>
                <Divider orientation="left">Todo</Divider>
                <List
                    bordered
                    dataSource={todo}
                    renderItem={(todo) => (
                        <List.Item
                            actions={[
                                <a onClick={() => showModal(todo)} key="list-loadmore-edit">
                                    Edit
                                </a>,
                                <a onClick={() => removeClick(todo)} key={todo.id}>
                                    Delete
                                </a>,
                                <Button
                                    onClick={() => markCompleteClick(todo)}
                                    key={todo.id}
                                    style={{
                                        color: todo.complete == false ? "blue" : "white",
                                        backgroundColor: todo.complete == false ? "" : "green",
                                    }}
                                >
                                    Mark as Complete
                                </Button>,
                            ]}
                        >
                            <Avatar style={AvatarStyle}>{todo.days}</Avatar> {todo.todo}
                        </List.Item>
                    )}
                />
            </Card>
            <Modal
                title="Update Todo"
                visible={isModalVisible}
                onOk={() => updateTodoClick()}
                onCancel={handleCancel}
                okText="Update"
            >
                <Input
                    placeholder="Todo"
                    style={InputStyle}
                    name="todoInput"
                    value={modalInput.todo}
                    onChange={(e) => setModalInput({ todo: e.target.value, id: modalInput.id })}
                />
            </Modal>
        </div>
    )
}
