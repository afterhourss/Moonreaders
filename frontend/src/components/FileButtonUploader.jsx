import { useRef, useState } from "react"

function FileButtonUploader({handleImageUpload, setFile}) {

    const hiddenFileInput = useRef(null)

    const handleClick = e => {
        hiddenFileInput.current.click();
    }

    const handleChange = e => {
        setFile(e.target.files[0])
        handleImageUpload()
    }

  return (
    <div>
        <button className="px-4 py-2 border rounded-md" onClick={handleClick}>Upload image</button>
        <input type="file" className="hidden" name="avatar" ref={hiddenFileInput} onChange={handleChange}/>
    </div>
  )
}

export default FileButtonUploader