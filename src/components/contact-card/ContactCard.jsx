import React from 'react'
import { useDeleteContactMutation } from '../../store/api/nimble.api';
import { Link } from 'react-router-dom';

export function ContactCard({ contactData }) {
    const [deleteContact] = useDeleteContactMutation();
    const avatar = contactData.avatar_url;
    const firstName = contactData.fields["first name"] ? contactData.fields["first name"][0].value : "";
    const lastName = contactData.fields["last name"] ? contactData.fields["last name"][0].value : "";
    const email = contactData.fields["email"] ? contactData.fields["email"][0].value : "";
    const tags = contactData.tags;

    return (
        <Link to={`/contacts/${contactData.id}`} className='flex gap-6 bg-gray-100 hover:bg-gray-300 hover:cursor-pointer mb-4  max-w-[550px] rounded pt-4 pb-4 pl-4 relative z-10'>
            <img src={avatar} alt="some user avatar" className='w-[60px] h-[60px] rounded-full' />
            <div className='flex flex-col min-w-[320px]'>
                <span>{`${firstName} ${lastName}`}</span>
                <span>{email}</span>
                <div className='flex flex-wrap mt-3 gap-2'>
                    {tags.length > 0 && (
                        tags.map(item => (
                            <span key={item.id} className='flex items-center bg-gray-400 h-6 p-0.5 px-2 rounded-md mr-1 text-center'>{item.tag}</span>
                        ))
                    )}
                </div>
            </div>
            <button className='absolute right-3 top-2 z-20' onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                deleteContact(contactData.id);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </Link>
    )
}
