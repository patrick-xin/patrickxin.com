import { useMediaQuery } from 'react-responsive'
import TocButton from './TocButton'
import TocDrawer from './TocDrawer'

type TableOfContentProps = {
  hasToc: boolean
  isTocOpen: boolean
  setTocOpen: (isOpen: boolean) => void
}
const TableOfContent = ({
  hasToc,
  isTocOpen,
  setTocOpen,
}: TableOfContentProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  if (!hasToc) return null
  return (
    <>
      {!isTocOpen && !isTabletOrMobile && (
        <TocButton onClick={() => setTocOpen(true)} />
      )}

      <TocDrawer
        isDrawerOpen={isTocOpen}
        setOpenDrawer={(openDrawer) => setTocOpen(openDrawer)}
      />
    </>
  )
}

export default TableOfContent
