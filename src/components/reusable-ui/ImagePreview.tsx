import React from 'react'

type ImagePreviewProps = {
    imageURL?: string;
}

export default function ImagePreview({imageURL} : ImagePreviewProps) {
  return (
    <div>
        <div className="bg-yellow-700 flex-1 flex justify-center">
                      <div className="border border-indigo-600 size-[320px] md:size-[400px]">
                        <img src={imageURL} className="size-full"/>
                      </div>
                  </div>
    </div>
  )
}
