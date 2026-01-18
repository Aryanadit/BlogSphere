import {useCallback , useEffect ,useState } from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Button , Select , Input , RTE} from '../index.js'
import appwriteService from '../../appwrite/config.js'

export default function PostForm({post}){

    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const {register , handleSubmit , watch , setValue , control,
        getValues} = useForm({
            defaultValues : {
                title : post?.title || '',
                slug : post?.slug  || '' ,
                status : post?.status || 'active',
            }
        })

    const userData = useSelector( (state) => state.auth.userData)

    // data is automatically created by React Hook Form.
    // we never manually build data
    // React Hook Form does it for us.


    const submit = async (data) => {
        setIsSubmitting(true) 

        try {
            if (post) {
                const file =
                    data.image?.[0]
                        ? await appwriteService.uploadFile(data.image[0])
                        : null

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage)
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                })

                if (dbPost) navigate(`/post/${post.$id}`)
            } else {
                const file =
                    data.image?.[0]
                        ? await appwriteService.uploadFile(data.image[0])
                        : null

                if (!file) throw new Error("Image upload failed")

                data.featuredImage = file.$id

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })

                if (dbPost) navigate(`/post/${dbPost.$id}`)
            }
        } catch (error) {
            console.error("Post submit error:", error)
            alert(error.message)
        } finally {       
            setIsSubmitting(false) 
        }
    }


    const slugTransform = useCallback( (value) => {
        
        if(value && typeof value === 'string'){
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '')
                .replace(/\s+/g, '-')
        }
        return ''
    } , [] )

    useEffect( () => {
        const subscription = watch( (value , {name}) => {
            if(name === 'title' ) {
                setValue('slug' , slugTransform(value.title ,
                    {shouldValidate : true}
                ))
            }
        })

        return () => {
            subscription.unsubscribe()
        }

    } , [watch , slugTransform , setValue ])

    useEffect(() => {
        if (post?.content) {
            setValue("content", post.content, {
                shouldValidate: true,
            })
        }
    }, [post, setValue])


return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6">
            <div className="w-full lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", 
                        { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value),
                        { shouldValidate: true });
                    }}
                />
                <RTE 
                label="Content :" 
                name="content" 
                control={control} 
                defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-1/3">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button 
                type="submit"
                disabled={isSubmitting}
                bgColor={post ? "bg-green-500" : "bg-red-500"}
                    className={`w-full ${
                        isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                    }`} >
                    {isSubmitting
                        ? post ? "Updating..." : "Submitting..."
                        : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}