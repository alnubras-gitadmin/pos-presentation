// components/mdx-wrapper.tsx
'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from './ui/mdx-primitives';

export default function SlideWrapper({
    mdxSource,
}: {
    mdxSource: MDXRemoteSerializeResult;
}) {
    return (
        <div className="transition-all duration-500 ease-in-out transform scale-100 hover:scale-105">
            <MDXRemote {...mdxSource} components={mdxComponents} />
        </div>
    )
}
