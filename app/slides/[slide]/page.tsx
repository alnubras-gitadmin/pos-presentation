// app/slides/[slide]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import RenderClient from './render-client';
import { mdxComponents } from '@/components/ui/mdx-primitives';

type Params = Promise<{ slide: string }>;
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'slides'));
  return files.map(fn => ({ slide: fn.replace(/\.mdx$/, '') }));
}

export default async function SlidePage({ params }: { params: Params }) {
  const { slide } = await params;
  const filePath = path.join(process.cwd(), 'slides', `${slide}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(raw);
  const mdxSource = await serialize(content, { scope: data });

  const files = fs.readdirSync(path.join(process.cwd(), 'slides'));
  const index = files.indexOf(`${slide}.mdx`);
  const total = files.length;

  return (
    <RenderClient
      mdxSource={mdxSource}
      frontMatter={data}
      index={index}
      total={total}
      components={mdxComponents}
    />
  );
}
