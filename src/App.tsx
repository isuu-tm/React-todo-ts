import React, {useState} from 'react';
import './App.css'
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed';

const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id:v1(), title:'React', isDone:true},
        {id:v1(), title:'React', isDone:true},
        {id:v1(), title:'Angular', isDone:false},
        {id:v1(), title:'React', isDone:true},
    ])

    function removeTask(id:string) {
        setTasks(tasks.filter( task => id !== task.id ))
        /* Метод filter возвращет элементы которые прошли проверку,
        * непостредственнно true || false */
    }
    const [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id:v1(), title:'React', isDone:true},
        {id:v1(), title:'Vue', isDone:true},
        {id:v1(), title:'Angular', isDone:false},
        {id:v1(), title:'React', isDone:true},
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

    function addTask(title:string) {

        let newTask = {id:v1(), title:title, isDone:false};
        let newTasks = ([newTask, ...tasks])
        setTasks(newTasks)
    }

    function changeStatus(taskId:string, isDone:boolean) {
        let task = tasks.find( t => t.id === taskId);
        if (task) {
        task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className='app'>
            <TodoList
                title={'Webpack'}
                tasks={tasksForFilter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
};

export default App;