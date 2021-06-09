import Head from 'next/head'
import { FC } from 'react';

export interface MetaArgs {
    title: string;
    keywords: string;
    description: string;
}
const Meta: FC<MetaArgs> = (args: MetaArgs) => {
    return (
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={args.keywords} />
        <meta name='description' content={args.description} />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <title>{args.title}</title>
      </Head>
    )
  }
export default Meta;