import React from 'react'

function InputFormpassword({icon:Icon,nameForm, typeInput='password',nameInput,handleChange,valueInput,placeholderInput,error}) {
  return (
   <div>
    <p>{nameForm}</p>
    <label className="input input-bordered flex items-center gap-2 w-full">
        <Icon className="h-4 w-4 opacity-70 text-amber-900"/>
        <input type={typeInput}
        className="text-amber-700 placeholder:text-amber-700" 
        name={nameInput}
        value={valueInput}
        onChange={handleChange}
        placeholder={placeholderInput} />
        {error && <span className='text-red-400'>{error}</span>}
      </label>
      </div>
  )
}

export default InputFormpassword