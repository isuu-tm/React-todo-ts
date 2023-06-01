import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}

export default function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title);

    const activateEditMode = () => setEditMode(true);
    const activateViewMode = () => {
        setEditMode(false)
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.currentTarget.value;
        setTitle(newTitle);
        props.onChange(newTitle);
    };


    return editMode
        ? <input
            value={props.title}
            onBlur={activateViewMode}
            autoFocus
            onChange={onChangeTitleHandler}
        />
        : <span
            onDoubleClick={activateEditMode}
        >
            {props.title}
          </span>

}