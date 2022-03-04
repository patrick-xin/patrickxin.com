import Image from 'next/image'

type PostThumbnail = {
  title: string
  author: string
  fromUrl: string
  imageUrl: string
}

const PostThumbnail = ({ title, author, fromUrl, imageUrl }: PostThumbnail) => {
  return (
    <div>
      <Image
        src={imageUrl}
        layout="responsive"
        className="rounded-md"
        width={400}
        height={270}
        alt={`${title}-image`}
        objectFit="cover"
        priority
      />
      <div className="mt-2 text-xs text-center text-gray-400 dark:text-gray-500 lg:mt-4 lg:text-sm">
        Image from
        <a
          className="inline-block mx-2 hover:text-orange dark:hover:text-mint"
          href={fromUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          {author}
        </a>
        <span>on</span>
        <a
          className="inline-block mx-2 hover:text-orange dark:hover:text-mint"
          href="https://unsplash.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Unsplash
        </a>
      </div>
    </div>
  )
}

export default PostThumbnail
