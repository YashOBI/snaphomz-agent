import React, { useEffect, useState } from 'react'
import { RoundedButton } from '../buttons/RoundedButton'
import { cn } from 'utils/styleUtilities'

export interface FileUploadProps {
  label?: React.ReactNode
  setFile: (file: File | null) => void
  className?: string
  initialFiles?: FileList
  inputClassName?: string
}

export const RoundedButtonFileUpload: React.FC<FileUploadProps> = ({
  label,
  setFile,
  className,
  initialFiles,
  inputClassName
}) => {
  const [localFile, setLocalFile] = useState<File | null>(null)

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      // Ensure there's at least one file
      setLocalFile(initialFiles[0]) // Set the first file from initialFiles
    }
  }, [initialFiles])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0] // Take the first file
      setLocalFile(selectedFile) // Update state with the single selected file
      setFile(selectedFile) // Assuming setFile is another state or prop function for handling the file
    }
  }

  return (
    <div
      className={cn(
        'flex justify-center py-1 text-sm px-8 font-medium bg-white text-black rounded-full  disabled:opacity-75 cursor-pointer border border-black',
        className
      )}>
      {label ? label : null}

      <div className="mt-1">
        <label className="inline-block">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="cursor-pointer">Upload</div>
        </label>
      </div>
    </div>
  )
}
