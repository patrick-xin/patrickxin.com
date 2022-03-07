type GradientLinkProps = {
  text: string
}

const GradientLink = ({ text }: GradientLinkProps) => {
  return (
    <span className="inline-flex relative py-2 px-1 w-32 h-8 text-gray-700 dark:text-snow border-none ">
      <span className="absolute after:absolute inset-1 after:-inset-x-2 after:top-0.5 p-0 m-0 after:h-full after:content-[''] after:bg-inherit bg-button-gradient bg-gradient-to-bl from-blue-500 after:from-inherit via-mint after:via-inherit to-pink-600 after:to-inherit rounded border-none after:blur animate-button-gradient gradient-link" />
      <span className="flex absolute -inset-0.5 justify-center items-center hover:text-orange dark:hover:text-mint bg-snow dark:bg-lead rounded transition-all ease-in-out">
        {text}
      </span>
    </span>
  )
}

export default GradientLink
