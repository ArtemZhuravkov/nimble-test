import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetContactQuery } from '../store/api/nimble.api';
import { Layout } from '../components/layout/Layout';
import { CreateTagForm } from '../components/create-tag-form/CreateTagForm';

export function ContactPage() {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetContactQuery(id);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (data) {
      setContact(data.resources[0])
    }
  }, [data]);

  return (
    <Layout>
      {isLoading && (<p className='text-center'>Loading...</p>)}
      {isError && (<p className='text-center'>Failed to fetch data!</p>)}
      {contact && (<div className='flex justify-center mt-10'>
        <div className='flex flex-col px-5'>
          <div className='flex gap-6 mb-4 max-w-[550px] rounded pt-4 pb-4 pl-4'>
            <img src={contact.avatar_url} alt="some user avatar" className='w-[60px] h-[60px] rounded-full' />
            <div className='flex flex-col min-w-[320px]'>
              <span>{`${contact.fields["first name"] ? contact.fields["first name"][0].value : ""} ${contact.fields["last nam"] ? contact.fields["last nam"][0].value : ""}`}</span>
              <span>{contact.fields["email"] ? contact.fields["email"][0].value : ""}</span>

            </div>
          </div>
          <div className='mb-10'>
            <span className='font-bold'>Tags</span>
            <div className='flex flex-wrap mt-3 gap-2'>
              {contact.tags?.length > 0 && (
                contact.tags.map(item => (
                  <span key={item.id} className='flex items-center bg-gray-400 h-6 p-0.5 px-2 rounded-md text-center'>{item.tag}</span>
                ))
              )}
            </div>
          </div>
          <CreateTagForm contactId={contact.id} contactTags={contact.tags2}/>
        </div>
      </div>)}
    </Layout>
  )
}
