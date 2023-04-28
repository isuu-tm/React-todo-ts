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
    removeTask: (id: string, todoListId:string) => void
    changeFilter: (value: FilterType, todoListId:string) => void
    addTask: (title: string, todoListId:string) => void
    changeStatus: (taskId:string, isDone:boolean, todoListId:string) => void
    filter: FilterType
    id:string
    removeTodoList: (todoListId:string) => void
}
export const TodoList: FC<PropsType> = (props) => {

    const [error, setError] = useState<string | null>('')

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTaskTitle.trim() === '') {
            setTimeout(() => {
                setError('Поле обязательно!')
            }, 100)
            return;
        } else if (e.charCode === 13) {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Поле обязательно!')
            return;
        } else {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const onAllFilterHandler = () => props.changeFilter('All', props.id )
    const onActiveFilterHandler = () => props.changeFilter('Active', props.id)
    const onCompletedFilterHandler = () => props.changeFilter('Completed', props.id)
    return (
        <div className='todo'>
            <h3>{props.title}
                <button
                    onClick={removeTodoListHandler}
                >
                    Удалить
                </button>
            </h3>
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
                            props.removeTask(task.id, props.id)
                        }

                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.id)
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
