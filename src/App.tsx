import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

export type FilterType = 'All' | 'Active' | 'Completed';


export type TaskStateType = {
    [key:string]: Array<TaskType>
}
const App = () => {
    type TodoListType = {
        id: string;
        title: string;
        filter: FilterType;
    };

    let todoListId1 = v1();
    let todoListId2 = v1();
    let todoListId3 = v1();

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: 'Закончить работу', isDone: true},
            {id: v1(), title: 'Рухи', isDone: true},
            {id: v1(), title: 'what', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'what', isDone: true},
            {id: v1(), title: 'what', isDone: true},
            {id: v1(), title: 'what', isDone: false},
        ],
        [todoListId3]: [
            {id: v1(), title: 'what', isDone: true},
            {id: v1(), title: 'what', isDone: true},
            {id: v1(), title: 'what', isDone: false},
            {id: v1(), title: 'Мартин Иден', isDone: false},
        ],
    });

    function removeTask(id: string, todoListId: string) {
        let tasksObj = {...tasks};
        let filteredTasks = tasksObj[todoListId].filter((task) => id !== task.id);
        tasksObj[todoListId] = filteredTasks;
        setTasks(tasksObj);
    };

    function changeFilter(value: FilterType, todoListId: string) {
        let todoListsCopy = [...todoLists];
        let todolist = todoListsCopy.find((t) => t.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists(todoListsCopy);
        }
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasksObj = {...tasks};
        tasksObj[todoListId] = [...tasksObj[todoListId], newTask];
        setTasks(tasksObj);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasksObj = {...tasks};
        let newTasks = tasksObj[todoListId].map((task) => {
            if (task.id === taskId) {
                return {...task, isDone: isDone};
            } else {
                return task;
            }
        });
        tasksObj[todoListId] = newTasks;
        setTasks(tasksObj);
    };
    function ChangeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let todolistIdTasks = tasks[todoListId];
        let task = todolistIdTasks.find( t => t.id === taskId);

        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    };

    const removeTodoList = (todoListId: string) => {
        const tasks1 = todoLists.filter(t => t.id !== todoListId)
        setTodoLists(tasks1);
        delete tasks[todoListId]
        setTasks({...tasks})
    };

    function addTodolist(title: string) {
        let todolist: TodoListType =
            {
                id: v1(),
                title: title,
                filter: 'All'
            }
            setTodoLists([todolist, ...todoLists]);
            setTasks({
                ...tasks,
                [todolist.id] : []
            })
    }

    function changeTodoListTitle(id:string, newTitle:string) {
        const todolist = todoLists.find(tl => tl.id === id);
        if(todolist) {
            todolist.title = newTitle;
            setTodoLists([...todoLists])
        };
    }

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What', filter: 'All'},
        {id: todoListId2, title: 'What', filter: 'All'},
        {id: todoListId3, title: 'What', filter: 'All'},
    ]);


    return (
        <div className='app'>
            <AddItemForm
                addItem={addTodolist}
                id={''}
            />
            {
                todoLists.map((tl) => {
                    let tasksForFilter = tasks[tl.id];

                    if (tl.filter === 'Active') {
                        tasksForFilter = tasksForFilter.filter((task) => task.isDone === false);
                    }

                    if (tl.filter === 'Completed') {
                        tasksForFilter = tasksForFilter.filter((task) => task.isDone === true);
                    }

                    return (
                        <TodoList
                            key={tl.id}
                            removeTodoList={removeTodoList}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForFilter}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            ChangeTaskTitle={ChangeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    );
                })
            }
        </div>
    );
};


export default App;