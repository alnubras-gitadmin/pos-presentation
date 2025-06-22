'use client';

import dynamic from 'next/dynamic';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ComponentType } from 'react';

const SlideWrapper = dynamic(() => import('@/components/slideWrapper'), {
  ssr: false,
});

interface Props {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: { title?: string };
  index: number;
  total: number;
  components?: Record<string, ComponentType<any>>; // ✅ Add this
}

export default function RenderClient(props: Props) {
  return <SlideWrapper {...props} />;
}
