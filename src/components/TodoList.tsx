import React, {FC} from 'react';
import {FilterType} from "../App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: number) => void
    changeFilter: (value: FilterType) => void
}
export const TodoList: FC<PropsType> = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>Добавить</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        return <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                            />
                            <span>
                                {task.title}
                            </span>
                            <button
                                onClick={() => props.removeTask(task.id)}
                            >
                                Удалить
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    onClick={() => props.changeFilter('All')}
                >
                    Все
                </button>
                <button
                    onClick={() => props.changeFilter('Active')}
                >
                    Активные
                </button>
                <button
                    onClick={() => props.changeFilter('Completed')}
                >
                    Законченные
                </button>
            </div>
        </div>
    );
};
