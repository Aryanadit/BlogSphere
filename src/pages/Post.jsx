import { useEffect , useState } from "react" ;
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12">
            <Container>
                <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="w-full relative">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-96 object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="shadow-lg">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="shadow-lg">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
                        <div className="prose prose-lg max-w-none browser-css text-gray-700">
                            {parse(post.content)}
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    ) : null;
}