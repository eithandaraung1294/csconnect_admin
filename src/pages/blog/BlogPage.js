import {React, useEffect, useState} from 'react';
import {Link as RouterLink, useLocation } from "react-router-dom";

import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Link } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';
// mock
import POSTS from '../../_mock/blog';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const axiosPrivate = useAxiosPrivate();
  const createBlogUrl = '/dashboard/blogs/create';
  const location = useLocation();
  const [posts, setPosts] = useState();
  const [totalPages, setTotalPages] = useState();
  const [errMsg, setErrMsg] = useState();

  const getAllPostsUrl = "/admin/posts/all"

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getAllPosts = async () => {
      try {
        const posts = await axiosPrivate.get(getAllPostsUrl,{
          signal: controller.signal
        });

        if(isMounted){
          setPosts(posts.data.data);
          setTotalPages(posts.data.totalPages);
        }
      } catch (error) {
        if(error.response.status === 400) {
          setErrMsg(error.response.data.message)
        }else{
          setErrMsg("Something Wrong!");
        }
      }
    }
    getAllPosts()
    return () => {
      isMounted = false;
      controller.abort();
    }
  },[])

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | CCKL </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Link to={createBlogUrl} component={RouterLink} state={{ from: location}} replace>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Post
            </Button>
          </Link>
        </Stack>
       

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack> */}

        <Grid container spacing={3}>
          {posts?.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
