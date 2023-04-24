import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterType} from "../App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}
export const TodoList: FC<PropsType> = (props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllFilterHandler = () => props.changeFilter('All')
    const onActiveFilterHandler = () => props.changeFilter('Active')
    const onCompletedFilterHandler = () => props.changeFilter('Completed')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    type="text"
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={addTask}
                >
                    Добавить
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {

                        const onRemoveHandler = () => {
                            props.removeTask(task.id)
                        }

                        return <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                            />
                            <span>
                                {task.title}
                            </span>
                            <button
                                onClick={onRemoveHandler}
                            >
                                Удалить
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    onClick={onAllFilterHandler}
                >
                    Все
                </button>
                <button
                    onClick={onActiveFilterHandler}
                >
                    Активные
                </button>
                <button
                    onClick={onCompletedFilterHandler}
                >
                    Законченные
                </button>
            </div>
        </div>
    );
};
