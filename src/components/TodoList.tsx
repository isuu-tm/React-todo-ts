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
    changeStatus: (taskId:string, isDone:boolean) => void
    filter: FilterType
}
export const TodoList: FC<PropsType> = (props) => {

    const [error, setError] = useState<string | null>('')

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')

        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Поле обязательно!')
            return;
        } else {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
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
                    className={error? 'error' : ''}
                />
                <button
                    onClick={addTask}
                >
                    Добавить
                </button>
                {
                    error &&
                    <div className="error-message">
                    {error}
                    </div>
                }
            </div>
            <ul>
                {
                    props.tasks.map(task => {

                        const onRemoveHandler = () => {
                            props.removeTask(task.id)
                        }

                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked)
                        }

                        return <li
                            key={task.id}

                        >
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeHandler}
                            />
                            <span className={task.isDone? 'finished' : ''}>
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
                    className={props.filter === 'All' ? 'is-done' : ''}
                    onClick={onAllFilterHandler}
                >
                    Все
                </button>
                <button
                    className={props.filter === 'Active' ? 'is-done' : ''}
                    onClick={onActiveFilterHandler}
                >
                    Активные
                </button>
                <button
                    className={props.filter === 'Completed' ? 'is-done' : ''}
                    onClick={onCompletedFilterHandler}
                >
                    Законченные
                </button>
            </div>
        </div>
    );
};
