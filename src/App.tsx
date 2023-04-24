import React, {useState} from 'react';
import './App.css'
import {TaskType, TodoList} from "./components/TodoList";


const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id:1, title:'React', isDone:true},
        {id:2, title:'React', isDone:true},
        {id:3, title:'Angular', isDone:false},
        {id:4, title:'React', isDone:true},
    ])
    const [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id:1, title:'React', isDone:true},
        {id:2, title:'React', isDone:true},
        {id:3, title:'Angular', isDone:false},
        {id:4, title:'React', isDone:true},
    ])

    return (
        <div className='app'>
            <TodoList title={'Webpack'} tasks={tasks}/>
            <TodoList title={'Hello'} tasks={tasks1}/>
            <TodoList title={'Hello'} tasks={tasks1}/>
        </div>
    );
};

export default App;