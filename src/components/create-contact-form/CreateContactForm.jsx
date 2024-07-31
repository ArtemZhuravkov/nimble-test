import React, { useRef, useState } from 'react'
import { useCreateContactMutation } from '../../store/api/nimble.api';

export function CreateContactForm() {
    const formRef = useRef(null)
    const [data, setData] = useState({
        "first name": null,
        "last name": null,
        "email": null,
    });

    const [createContact] = useCreateContactMutation();

    const handleForm = (e) => {
        e.preventDefault()
        if (data["first name"]?.length > 0 && data["last name"]?.length > 0) {
            const contactData = {
                avatar_url: "",
                record_type: 'person',
                privacy: {
                    edit: null,
                    read: null,
                },
                owner_id: null,
                fields: { ...data }
            }
            createContact(contactData).unwrap().then(() => {
                console.log('Contact created!');
                formRef.current.reset();
            }).catch((err) => {
                console.log("Error", err);
            });
        } else {
            return alert("Need to fill first name and last name!")
        }
    }

    const handleInput = (e, fieldLabel) => {
        const newData = { ...data };
        newData[fieldLabel] = [{
            value: e.target.value,
            modifier: '',
            label: fieldLabel
        }];
        setData(newData);
    }

    return (
        <div>
            <div className='w-72 sticky top-8'>
                <h3 className='font-bold text-xl mb-4'>Create Contact</h3>
                <form onSubmit={(e) => handleForm(e)} ref={formRef}>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor="firstName" className='capitalize mb-2'>first name</label>
                        <input onChange={(e) => handleInput(e, "first name")} type="text" name="firstName" id="firstName" className='border rounded-lg h-12 w-full px-1' autoComplete='off' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor="lastName" className='capitalize mb-2'>last name</label>
                        <input onChange={(e) => handleInput(e, "last name")} type="text" name="lastName" id="lastName" className='border rounded-lg h-12 w-full px-1' autoComplete='off' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label htmlFor="email" className='capitalize mb-2'>email</label>
                        <input onChange={(e) => handleInput(e, "email")} type="email" name="email" id="email" pattern="[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}" placeholder='example@gmail.com' className='border rounded-lg h-12 w-full px-1' autoComplete='off' />
                    </div>
                    <button className='capitalize border rounded-sm w-full h-11 font-bold hover:bg-gray-200'>add contact</button>
                </form>
            </div>
        </div>
    )
}
