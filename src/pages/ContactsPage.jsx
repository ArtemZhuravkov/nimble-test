import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { useGetContactsQuery } from '../store/api/nimble.api'
import { ContactCard } from '../components/contact-card/ContactCard';
import { CreateContactForm } from '../components/create-contact-form/CreateContactForm';


export function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const { isLoading, isError, data } = useGetContactsQuery();


  useEffect(() => {
    if (data) {
      setContacts(data)
    }
  }, [data])


  return (
    <Layout>
      <div className='flex gap-6 mt-8 relative max-sm:flex-col max-sm:items-center px-2'>
        <CreateContactForm />
        <div className='flex-auto'>
          <h3 className='font-bold text-xl mb-4'>Contacts</h3>
          <ul>
            {isLoading && (<p className='text-center'>Loading...</p>)}
            {isError && (<p className='text-center'>Failed to fetch data!</p>)}
            {contacts?.map(contact => (
              <ContactCard contactData={contact} key={contact.id} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
