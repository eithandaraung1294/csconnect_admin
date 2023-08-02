import { Alert, Avatar, Box, Button, Card, Chip, Container, Divider, Link, Stack, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { useLocation , Link as RouterLink, useSearchParams, useNavigate} from "react-router-dom";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import MessageIcon from '@mui/icons-material/Message';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Iconify from '../../components/iconify';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
import { StandardImageList } from '../../components/standard-image-list';


const StyledImagesBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    color: theme.palette.text.disabled,
}));

const StyledInfo = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(3),
    color: theme.palette.text.disabled,
  }));

export default function ViewBlogPage() {
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [post, setPost] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const slug = searchParams.get('b');
    const url = "/admin/posts"
    const from = "/dashboard/blogs";
    const editBlogUrl = `/dashboard/blogs/edit?b=${slug}`;
    const deleteUrl = "/admin/posts/delete";

    const cardstyle = { width: '100%',  p: 4, backgroundColor: '#FFFFFF', fontSize: 2 };
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
      
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPost = async () => {
            try {
                await delay(1000);
                const post = await axiosPrivate.get(`${url}/${slug}`,{
                    signal: controller.signal
                });
                if(isMounted) setPost(post.data);
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
    },[slug])
    
    const handleDelete = async () => {
        try {
            await axiosPrivate.post(deleteUrl, JSON.stringify({post_id: post?.id}))
            navigate(from, {replace: true})
        } catch (error) {
            if(error.response.status === 400) {
                setErrMsg(error.response.data.message);
            }else{
                setErrMsg("Something Wrong!");
            }
        }
    }
   
    return (
        <>
            <Container>
                
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Post Detail
                    </Typography>
                    <Link to={from} component={RouterLink}>
                        <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                            Back
                        </Button>
                    </Link>
                </Stack>
                <Card sx={cardstyle}>
                    {   errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>   }
                    <Stack direction="row" spacing={1}>
                        <Avatar alt="Remy Sharp" src={post?.user?.photo} />
                        <Stack direction="column">
                            <Typography> {post?.user?.username} </Typography>
                            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block'}}>
                                {fDate(post?.createdAt)}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Typography variant="h4" justify="center">
                            { post?.title }

                            <Box>
                                {post?.categories?.map((item, index) => (
                                    <Chip icon={<BookmarksIcon />} label={item.name} variant="outlined" key={index}/>
                                ))}
                            </Box>
                        </Typography>
                    </Stack>
                    
                    {/* <Divider /> */}
                    
                    <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                            __html:post?.description
                        }}
                    />
                    <Divider />

                    <StyledImagesBox >
                        <StandardImageList images={post?.image}/>
                    </StyledImagesBox>
                    <StyledInfo>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ml: 1.5,
                            }}
                        >
                            {/* <Iconify icon='eva:message-circle-fill' sx={{ width: 16, height: 16, mr: 0.5 }} /> */}
                            <MessageIcon/>
                            <Typography variant="caption">{fShortenNumber(post?.commentCount)}</Typography>
                        </Box>
                        ))
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ml:1.5,
                            }}
                        >
                            <RemoveRedEyeIcon/>
                            <Typography variant="caption">{fShortenNumber(post?.view_count)}</Typography>
                        </Box>
                        ))
                    </StyledInfo>

                    <Stack direction="row" spacing={2} sx={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', }}>
                        <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                        <Link to={editBlogUrl} component={RouterLink} state={slug}>
                            <Button variant="outlined">Edit</Button>
                        </Link>
                    </Stack>
                </Card>
            </Container>
        </>
    );
}

