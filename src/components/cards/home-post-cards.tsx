import React from 'react';

import Link from 'next/link';
import { Box, LazyImage, Avatar, Badge, Stack } from '@nature-ui/core';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import readableDate from 'utils/readable-date';

import { Styled } from 'components/nature-jsx-elements';
import { getNChars } from 'utils/getNChars';

const BottomVariants = {
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: 100 },
};

export const HomePostCards = ({ post, ...rest }) => {
  const {
    slug,
    tags,
    title,
    description,
    imageUrl,
    date,
    readTimeMinutes: readTime,
    author: { githubUrl, websiteUrl, avatarUrl, name },
  } = post;

  let fallbackSrc: any = imageUrl.split('.');

  if (fallbackSrc[fallbackSrc.length - 1] === 'gif') {
    fallbackSrc = fallbackSrc.join('.').replace(/\/c_scale.*?\//gis, '/w_50/');
  } else {
    fallbackSrc = imageUrl.replace(/\/c_scale.*?\//gis, '/c_scale,w_0.01/');
  }

  const authorProfile =
    name === 'Divine Hycenth'
      ? '/about'
      : `${websiteUrl}/about` || githubUrl || '#';

  const [ref, inView] = useInView();
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else controls.start('hidden');
  }, [controls, inView]);

  return (
    <motion.article
      ref={ref}
      animate={controls}
      initial='hidden'
      variants={BottomVariants}
      {...rest}
    >
      <Link href={slug}>
        <a>
          <div className='grid relative'>
            <LazyImage
              fallbackSrc={fallbackSrc}
              src={imageUrl}
              alt={title}
              className='rounded-2xl cursor-pointer w-full h-full object-cover'
            />
            <Badge className='absolute top-3 right-3 lowercase'>
              {readTime} min read
            </Badge>
          </div>
          {tags && (
            <Stack row spacing='2' className='mt-4'>
              {tags.map((tag, i) => (
                <Badge key={tag + i}>{tag}</Badge>
              ))}
            </Stack>
          )}
          <Styled.h3 className='hover:underline font-semibold cursor-pointer mt-3'>
            {title}
          </Styled.h3>
          <Styled.p className='my-4'>{getNChars(description)}</Styled.p>
        </a>
      </Link>
      <Link href={authorProfile}>
        <a>
          <Stack as='a' row spacing='2' className='items-center'>
            <Avatar src={avatarUrl} alt={name} />
            <Box>
              <p className='font-medium'>{name}</p>
              <p className='opacity-60 text-sm'>{readableDate(date)}</p>
            </Box>
          </Stack>
        </a>
      </Link>
    </motion.article>
  );
};
