const Description = ({ description }: { description: string }) => {
  return (
    <p
      className="p-4 my-6 text-base
      italic border-y border-black/10 dark:border-white/30 opacity-75 lg:py-10 lg:text-xl"
    >
      {description}
    </p>
  )
}

export default Description
