import Image from "next/image";

type PostThumbnail = {
  title: string;
  thumbnail: string;
  author: string;
  authorUrl: string;
  from: string;
  fromUrl: string;
};

const PostThumbnail = ({
  title,
  thumbnail,
  author,
  authorUrl,
  from,
  fromUrl,
}: PostThumbnail) => {
  return (
    <div>
      <div className="relative mx-4 lg:mx-12">
        <Image
          alt={`${title}-image`}
          src={thumbnail}
          layout="responsive"
          height={140}
          width={200}
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <p className="text-center my-4 lg:my-6 text-sm lg:text-base space-x-1 lg:space-x-2">
        <span>Image from</span>
        <a
          href={authorUrl}
          target="_blank"
          className="font-medium underline hover:text-mint transition-colors ease-linear"
        >
          {author}
        </a>
        <span>on</span>
        <a
          href={fromUrl}
          target="_blank"
          className="font-medium underline hover:text-orange transition-colors ease-linear"
        >
          {from}
        </a>
      </p>
    </div>
  );
};

export default PostThumbnail;
