import React, { useRef, useState } from 'react'
import { useAddTagsMutation } from '../../store/api/nimble.api';

export function CreateTagForm({ contactId, contactTags }) {
    const [tags, setTags] = useState("");
    const [addTags] = useAddTagsMutation();
    const formRef = useRef(null);

    const handleForm = (e) => {
        e.preventDefault();
        if (tags.length > 0) {
            const tagsArr = tags.split(",");
            addTags({ contactId: contactId, addedTags: { tags: [...contactTags, ...tagsArr] } }).unwrap().then(() => {
                console.log("Tag added!");
                formRef.current.reset();
            }).catch((err) => console.log(err))
        }
    }

    const handleInput = (e) => {
        const value = e.target.value
        setTags(value);
    }

    return (
        <form className='w-full flex flex-col gap-5' onSubmit={e => handleForm(e)} ref={formRef}>
            <input type="text" className='border-2 rounded-lg h-12 w-full px-2' placeholder='Add new tag - tag1,tag2...' onChange={(e) => handleInput(e)} />
            <button className='capitalize border-2 rounded-sm w-full h-11 font-bold hover:bg-gray-200'>add tag</button>
        </form>
    )
}
