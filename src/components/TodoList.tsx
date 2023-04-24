import React, {FC} from 'react';

export type TaskType = {
    id:number,
    title:string,
    isDone:boolean,
}

type PropsType = {
    title:string,
    tasks: Array<TaskType>
}
export const TodoList:FC<PropsType> = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>Добавить</button>
            </div>
            <ul>
                <li>
                    <input
                    type="checkbox"
                    checked={props.tasks[1].isDone}
                    />
                    <span>{props.tasks[3].title}</span>
                </li>
            </ul>
            <div>
                <button>Все</button>
                <button>Активные</button>
                <button>Законченные</button>
            </div>
        </div>
    );
};
