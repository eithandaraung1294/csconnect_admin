import { React, useState, useEffect} from 'react'
import { Link as RouterLink, useLocation, useSearchParams} from 'react-router-dom';
import { 
  Link, 
  Button, 
  Stack, 
  Typography, 
  Container,
  Alert, 
} from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Iconify from '../../components/iconify';
import { Form } from '../../sections/@dashboard/blog';
import useAuth from '../../hooks/useAuth';


export default function EditBlogPage() {

    const [post, setPost] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const auth = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const slug = searchParams.get('b'); 
    
    const url = "/admin/posts"
    const from = location?.state ? `/dashboard/blogs/detail?b=${location.state}` : "/dashboard/blogs";
    const blogEditUrl = "admin/posts/update";

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPost = async () => {
            try {
                const post = await axiosPrivate.get(`${url}/${slug}`,{
                    signal: controller.signal
                });

                console.log(post);
                if(isMounted){
                    await setPost({
                        id: post.data.id,
                        title : post.data.title,
                        description : post.data.description,
                        user_id : auth?.user?.id,
                        category_id : post.data.categories,
                        published : post.data.published,
                        cover_image : post.data.cover_image,
                        image : post.data.image
                    });
                }
            } catch (error) {
                if(error.response.status === 400) {
                    setErrMsg(error.response.data.message)
                }else{
                    setErrMsg("Something Wrong!");
                }
            }
        }
        getPost();
        return () => {
          isMounted = false;
          controller.abort();
        }

    },[])
    console.log(slug);
    console.log(post);
    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Edit Blog
                </Typography>
                <Link to={from} component={RouterLink}>
                    <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                        Back
                    </Button>
                </Link>
            </Stack>
            {   errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>   }
            
            {   post && 
                <Form
                    backUrl = {from}
                    url= {blogEditUrl}
                    initValues={post}
                    status="Edit"
                />
            }
            
            
        </Container>
        </>
        
    )
}
