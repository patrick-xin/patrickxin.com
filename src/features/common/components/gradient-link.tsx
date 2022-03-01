type GradientLinkProps = {
  text: string
}

const GradientLink = ({ text }: GradientLinkProps) => {
  return (
    <span className="px-1 py-2 inline-flex relative border-none w-32 h-8 text-gray-700 dark:text-snow ">
      <span className="gradient-link absolute inset-1 rounded border-none p-0 m-0 animate-button-gradient bg-gradient-to-bl from-blue-500 via-mint to-pink-600 bg-button-gradient after:content-[''] after:absolute after:-left-2 after:-right-2 after:top-0.5 after:h-full after:filter after:blur after:bg-inherit after:to-inherit after:via-inherit after:from-inherit" />
      <span className="absolute -inset-0.5 bg-snow dark:bg-lead rounded flex items-center justify-center transition-all ease-in-out dark:hover:text-mint hover:text-orange">
        {text}
      </span>
    </span>
  )
}

export default GradientLink
