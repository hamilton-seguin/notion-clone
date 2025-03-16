export const Spacer = ({
  handleClick,
  showHint,
}: {
  handleClick: () => void
  showHint: boolean
}) => {
  return (
    <div className="h-48 w-full py-0 px-12" onClick={handleClick}>
      {showHint && 'Click to create a new node'}
    </div>
  )
}
