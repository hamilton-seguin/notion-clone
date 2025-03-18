export const Spacer = ({
  handleClick,
  showHint,
}: {
  handleClick: () => void
  showHint: boolean
}) => {
  return (
    <div className="h-48 w-full py-2 pl-12" onClick={handleClick}>
      {showHint && 'Click to create a new node'}
    </div>
  )
}
