'use client'

import { Bounce, ToastContainer, toast } from 'react-toastify'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'
import { useState } from 'react'

const ContactForm = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: any) {
    event.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      name: event.currentTarget.name.value,
      email: event.currentTarget.email.value,
      message: event.currentTarget.message.value,
    }

    setLoading(true)

    const res = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res?.json() ?? {message: 'Internal Server Error'};
    
    if (res.status === 200) {
      setLoading(false)
      toast.success(data.message)
    } else {
      setLoading(false)
      toast.error(data.message)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input label="Full name" id="name" name="name" placeholder="Your name here" required />
        <Input
          label="Email address"
          id="email"
          type="email"
          name="email"
          placeholder="Your email address here"
          required
        />
        <Textarea
          label="Message"
          id="message"
          name="message"
          placeholder="Your message here"
          rows={7}
          required
        />
        {/* {!status?.success && <p className="my-2 font-light text-red-600">{status?.message}</p>}*/}
        <Button text={loading ? 'Submitting...' : 'Submit'} disabled={loading} />
      </form>
      <ToastContainer
      
        position="bottom-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        theme="colored"
        pauseOnHover={false}
        transition={Bounce}
      />
    </>
  )
}

export default ContactForm
