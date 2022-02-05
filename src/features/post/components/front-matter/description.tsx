const Description = ({ description }: { description: string }) => {
  return (
    <p
      className="italic text-base text-skin-secondary
      border-t border-b p-4 my-6 lg:py-10 border-black/10 dark:border-white/30 opacity-75 lg:text-xl"
    >
      {description}
    </p>
  );
};

export default Description;
