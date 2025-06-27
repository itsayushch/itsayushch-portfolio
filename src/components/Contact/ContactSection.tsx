'use client'
import { MsgIcon } from '@/utils/icons'
import { Check as CopiedIcon, Copy as CopyIcon } from 'lucide-react'

import ContactForm from './ContactForm'
import SectionHeading from '../SectionHeading/SectionHeading'
import { useState } from 'react'

const ContactSection = () => {
  return (
    <>
      <SectionHeading title="CONTACT ME" />
      <section
        id="contact"
        className="bg-secondary my-8 grid grid-cols-1 gap-16 rounded-4xl p-8 md:my-16 md:grid-cols-2 md:gap-8 lg:gap-12">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <h3 className="text-neutral text-3xl font-bold">Let's Talk</h3>
            <h4 className="text-accent text-2xl font-bold md:text-3xl">We'd love to help</h4>
            <p className="text-neutral mt-8">
              Crafting innovative solutions to solve real-world problems
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-neutral text-lg font-bold">Contact Information</p>
            <span className="flex flex-row space-x-4">
              <a
                href="mailto:itsayushch@gmail.com"
                className="text-neutral hover:text-accent flex items-center gap-1 font-light transition-colors duration-300">
                <MsgIcon /> itsayushch@gmail.com
              </a>
              <CopyButton textToCopy="itsayushch@gmail.com" />
            </span>

            {/* <a
              href="tel:+92 3123456789"
              className="text-neutral hover:text-accent flex items-center gap-1 font-light transition-colors duration-300">
              <PhoneIcon /> +92 3123456789
            </a> */}
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  )
}

export default ContactSection

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  return (
    // <button
    //   onClick={handleCopy}
    //   type='button'
    //   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    // >
    //   {copied ? <CopiedIcon /> : <CopyIcon size={'20px'}/>}
    // </button>
    <button
      onClick={handleCopy}
      type="button"
      className="bg-accent inline-flex cursor-pointer items-center rounded-lg px-3 py-2 text-center text-xs font-medium text-[#00071E]">
      {!copied ? (
        <>
          <CopyIcon size={'15px'} />
          &nbsp;Copy
        </>
      ) : (
        <>
          <CopiedIcon size={'15px'} />
          &nbsp;Copied
        </>
      )}
    </button>
  )
}

interface CopyButtonProps {
  textToCopy: string
}
