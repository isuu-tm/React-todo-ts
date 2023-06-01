import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterType
    id: string
    removeTodoList: (todoListId: string) => void
    ChangeTaskTitle: (taskId:string, newValue:string, id:string) => void
    changeTodoListTitle: (id:string, newTitle:string) => void
}
export const TodoList: FC<PropsType> = (props) => {

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    };
    const changeTodoList = (newTitle:string) => {
        props.changeTodoListTitle(props.id, newTitle)
    };

    const addTask = (title: string) => {
        // alert(title)
        props.addTask(title, props.id)
    }
    const onAllFilterHandler = () => props.changeFilter('All', props.id);
    const onActiveFilterHandler = () => props.changeFilter('Active', props.id);
    const onCompletedFilterHandler = () => props.changeFilter('Completed', props.id);
    return (
        <div className='todo'>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoList}/>
                <button
                    onClick={removeTodoListHandler}
                >
                    Удалить
                </button>
            </h3>
            <AddItemForm addItem={addTask} id={props.id}/>
            <ul>
                {
                    props.tasks.map(task => {

                        const onRemoveHandler = () => {
                            props.removeTask(task.id, props.id)
                        }

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.id)
                        };

                        const onChangeTitleHandler = (newValue:string) => {
                            props.ChangeTaskTitle(task.id, newValue, props.id)
                        };

                        return <li
                            key={task.id}
                            className={task.isDone ? 'finished' : ''}
                        >
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeHandler}
                            />
                            <EditableSpan
                                title={task.title}
                                onChange={onChangeTitleHandler}
                            />
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





