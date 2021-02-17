import { Box, Container, Stack } from '@nature-ui/core';

import MainLayout from 'layouts/main';
import { Styled } from 'components/nature-jsx-elements';
import { Search } from 'components/algolia-search';
import { BlogCard } from 'components/cards/blog-card';
import { getBlogPosts } from 'utils/get-blog-posts';

const Blog = ({ posts }) => {
  return (
    <MainLayout>
      <Box
        css={{
          minHeight: '15vh',
        }}
        className='grid place-content-center'
      >
        <Styled.h1 className='text-6xl font-bold'>Blog</Styled.h1>
      </Box>

      <Container className='pt-16 relative px-6 md:hidden' centered>
        <Search />
      </Container>

      <Container as='section' size='sm' className='my-28 mx-auto p-6 md:p-0'>
        <Stack col spacing='12'>
          {posts &&
            posts.map((post) => <BlogCard key={post.title} post={post} />)}
        </Stack>
      </Container>
    </MainLayout>
  );
};

export async function getStaticProps() {
  const posts = await getBlogPosts();
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
