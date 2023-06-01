import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormType = {
    addItem: (title:string) => void
    id:string;
}


export default function AddItemForm(props: AddItemFormType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('')

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTaskTitle.trim() === '') {
            setTimeout(() => {
                setError('Поле обязательно!')
            }, 100)
            return;
        } else if (e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    };

    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Поле обязательно!')
            return;
        } else {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    return (
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
    )
}