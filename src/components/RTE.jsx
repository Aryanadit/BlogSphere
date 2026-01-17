import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({
    name = 'content',
    control,
    label,
    defaultValue = '',
    }) {
    return (
        <div className="w-full">
        {label && (
            <label className="inline-block mb-1 pl-1">
            {label}
            </label>
        )}

        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
            <Editor
                apiKey="2idwxa9i61z4792u9m3gxe17fdms72lxdrewp1uq5w3hewh1"
                value={value}
                onEditorChange={onChange}
                init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'help',
                    'wordcount',
                ],
                toolbar:
                    'undo redo | blocks | bold italic forecolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat | help',
                content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
            )}
        />
        </div>
    )
    }
