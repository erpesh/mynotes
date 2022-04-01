import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";

const NotePage = () => {

    const {id} = useParams()

    const [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [id])

    const getNote = async () => {
        if (id === 'new') return

        const response = await fetch(`/api/notes/${id}`)
        const data = await response.json()
        setNote(data)
    }

    const updateNote = async () => {
        const response = await fetch(`/api/notes/${id}/`, {
            method : 'PUT',
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-CSRFToken': 'AgTR66xbOdHbPRe9M5OhPY30pbRnU7eUBQ2514uQhW5kauGAaWDAUC2Wot8ELikQ'
            },
            body : JSON.stringify(note)
        })
        const data = await response.json()
        console.log(data)
    }

    const createNote = async () => {
        await fetch(`/api/notes/`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-CSRFToken': 'AgTR66xbOdHbPRe9M5OhPY30pbRnU7eUBQ2514uQhW5kauGAaWDAUC2Wot8ELikQ'
            },
            body : JSON.stringify(note)
        })
    }

    const navigate = useNavigate()
    const deleteNote = async () => {
        await fetch(`/api/notes/${id}/`, {
            method : "DELETE",
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-CSRFToken': 'AgTR66xbOdHbPRe9M5OhPY30pbRnU7eUBQ2514uQhW5kauGAaWDAUC2Wot8ELikQ'
            }
        })
        navigate('/')
    }

    const handleSubmit = () => {
        if (id !== 'new' && note.body == '') {
            deleteNote()
        }else if (id !== 'new') {
            updateNote()
        }else if (id === 'new' && note) {
            createNote()
        }
        navigate('/')
    }

    const handleChange = (value) => {
        setNote(note => ({...note, 'body':value}))
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {id !== "new"? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
            <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}>{note?.body}</textarea>
        </div>
    );
};

export default NotePage;