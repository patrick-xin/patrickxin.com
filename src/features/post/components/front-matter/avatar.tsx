import Image from "next/image";

const Avatar = () => {
  return (
    <div className="relative">
      <Image
        alt="author-avatar"
        src={"/assets/images/avatar.jpeg"}
        layout="fixed"
        height={50}
        width={50}
        className="rounded-full"
        priority
      />
    </div>
  );
};

export default Avatar;
