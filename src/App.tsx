import React, {useState} from 'react';
import './App.css'
import {TaskType, TodoList} from "./components/TodoList";

export type FilterType = 'All' | 'Active' | 'Completed';

const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id:1, title:'React', isDone:true},
        {id:2, title:'React', isDone:true},
        {id:3, title:'Angular', isDone:false},
        {id:4, title:'React', isDone:true},
    ])

    function removeTask(id:number) {
        setTasks(tasks.filter( task => id !== task.id ))
        /* Метод filter возвращет элементы которые прошли проверку,
        * непостредственнно true || false */
    }
    const [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id:1, title:'React', isDone:true},
        {id:2, title:'Vue', isDone:true},
        {id:3, title:'Angular', isDone:false},
        {id:4, title:'React', isDone:true},
    ])



    const [filter, setFilter] = useState<FilterType>('All')
    /* Состояние свыше создана чтобы контролировать, какая данный момент задан фильтр*/

    let tasksForFilter = tasks;

    if (filter === 'Active') {
        tasksForFilter = tasks.filter(task => task.isDone === false)
    };

    if (filter === 'Completed') {
        tasksForFilter = tasks.filter(task => task.isDone === true)
    }

    function changeFilter(value:FilterType) {
        setFilter(value)
    }

    return (
        <div className='app'>
            <TodoList
                title={'Webpack'}
                tasks={tasksForFilter}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
};

export default App;