// components/mdx-wrapper.tsx
'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from './ui/mdx-primitives';

export default function SlideWrapper({
  mdxSource,
}: {
  mdxSource: MDXRemoteSerializeResult;
}) {
  return <MDXRemote {...mdxSource} components={mdxComponents} />;
}
