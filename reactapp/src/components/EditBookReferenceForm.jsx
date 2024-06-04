import React, {useState} from 'react'

export const EditBookReferenceForm = ({editBookReference, bookReference}) => {
    const [name, setName] = useState(bookReference.name)
    const [author, setAuthor] = useState(bookReference.author)
    const [publisher, setPublisher] = useState(bookReference.publisher)
    const [year, setYear] = useState(bookReference.year)
    const [edition, setEdition] = useState(bookReference.edition)

    const handleSubmit = (e) => {
        e.preventDefault();
        editBookReference(name,author,publisher,year,edition,bookReference.id);
        setName("")
        setAuthor("")
        setPublisher("")
        setYear("")
        setEdition("")
    }  

  return (
    <>
        <tr>
          <td colSpan={7}>
          <form className='ObeForm' onSubmit={handleSubmit}>
            <div className='container'>
                <div className='row'>
                <div className='col-6'>
                    <label htmlFor="">Name:</label>
                    <input type="text" className='form-input form-control' placeholder='Update book name' value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className='col-6'>
                    <label htmlFor="">Author:</label>
                    <input type="text" className='form-input form-control' placeholder='Update author name' value={author} onChange={(e) => setAuthor(e.target.value)} required/>
                </div>
                </div>
                <div className='row'>
                <div className='col-4'>
                    <label htmlFor="">Publisher:</label>
                    <input type="text" className='form-input form-control' placeholder='Update publisher name' value={publisher} onChange={(e) => setPublisher(e.target.value)} required/>
                </div>
                <div className='col-4'>
                    <label htmlFor="">Year:</label>
                    <input type="text" className='form-input form-control' placeholder='Update publishing year' value={year} onChange={(e) => setYear(e.target.value)} required/>
                </div>
                <div className='col-4'>
                    <label htmlFor="">Edition:</label>
                    <input type="text" className='form-input form-control' placeholder='Update published edition' value={edition} onChange={(e) => setEdition(e.target.value)} required/>
                </div>
                </div>
                
                
                
                
                <button type='submit' className='form-btn btn'>Update</button>
            </div>
          </form>
          </td>
        </tr>
        
    </>
    
  )
}
