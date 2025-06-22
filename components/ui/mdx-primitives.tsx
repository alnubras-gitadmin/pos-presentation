// components/mdx-components.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
// import { Callout } from '@/components/ui/callout';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from './badge';
import { Callout } from './Callout';
import { Separator } from './separator';

export const mdxComponents = {
  // Media
  Image,
  img: (props: any) => <img className="rounded mb-4" {...props} />,

  // Links
  a: (props: any) => <Link {...props} className="text-blue-600 hover:underline mb-4" />,

  // Headings
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-5 mb-2" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  h5: (props: any) => <h5 className="text-lg font-medium mt-3 mb-2" {...props} />,
  h6: (props: any) => <h6 className="text-base font-medium mt-2 mb-2 text-gray-700" {...props} />,

  // Text
  p: (props: any) => <p className="leading-relaxed mb-4 text-lg" {...props} />,
  ul: (props: any) => <ul className="list-disc ml-6 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal ml-6 mb-4" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 pl-4 italic text-gray-600 mb-4" {...props} />
  ),
  hr: (props: any) => <hr className="my-8 border-gray-200" {...props} />,

  // Code
  code: (props: any) => (
    <code className="bg-gray-100 text-sm font-mono px-1 py-0.5 rounded" {...props} />
  ),
  pre: (props: any) => (
    <ScrollArea className="mb-4">
      <pre className="bg-gray-900 text-white rounded p-4 overflow-auto" {...props} />
    </ScrollArea>
  ),

  // Tables
  table: (props: any) => <Table className="mb-6" {...props} />,
  thead: (props: any) => <TableHeader {...props} />,
  tbody: (props: any) => <TableBody {...props} />,
  tr: (props: any) => <TableRow {...props} />,
  th: (props: any) => <TableHead className="bg-gray-100" {...props} />,
  td: (props: any) => <TableCell {...props} />,

  // shadcn/ui Custom Components
  // Callout,
  Checkbox,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Callout,
  Separator
};
