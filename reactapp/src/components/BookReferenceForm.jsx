import React, {useState} from 'react'

export const BookReferenceForm = ({addBookReference}) => {
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [publisher, setPublisher] = useState("")
    const [year, setYear] = useState("")
    const [edition, setEdition] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addBookReference(name,author,publisher,year,edition);
        setName("")
        setAuthor("")
        setPublisher("")
        setYear("")
        setEdition("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <label htmlFor="" className='input-label'>Name:</label>
            <input type="text" className='form-input form-control' placeholder='Enter book name' value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div className='col-6'>
            <label htmlFor="" className='input-label'>Author:</label>
            <input type="text" className='form-input form-control' placeholder='Enter author name' value={author} onChange={(e) => setAuthor(e.target.value)} required/>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <label htmlFor="" className='input-label'>Publisher:</label>
            <input type="text" className='form-input form-control' placeholder='Enter publisher name' value={publisher} onChange={(e) => setPublisher(e.target.value)} required/>
          </div>
          <div className='col-4'>
            <label htmlFor="" className='input-label'>Year:</label>
            <input type="text" className='form-input form-control' placeholder='Enter publishing year' value={year} onChange={(e) => setYear(e.target.value)} required/>
          </div>
          <div className='col-4'>
            <label htmlFor="" className='input-label'>Edition:</label>
            <input type="text" className='form-input form-control' placeholder='Enter published edition' value={edition} onChange={(e) => setEdition(e.target.value)} required/>
          </div>
        </div>
        
        
        
        
        <button type='submit' className='form-btn btn'>Add Book</button>
      </div>
       
    </form>
  )
}
