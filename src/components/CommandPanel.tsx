import { NodeType } from '@/types'
import { useOverflowsScreenBottom } from '@/hooks'

import { SUPPORTED_NODE_TYPE } from '@/constants'

export const CommandPanel = ({
  selectedItemIndex,
  selectItem,
}: {
  selectedItemIndex: number
  selectItem: (nodeType: NodeType) => void
}) => {
  const { overflows, ref } = useOverflowsScreenBottom()

  return (
    <div
      ref={ref}
      className={`absolute z-10 -bottom-4 left-2 bg-orange-50 w-48 p-1.5 transform rounded shadow-lg dark:bg-zinc-700 ${
        overflows ? '-translate-y-16' : 'translate-y-full'
      }`}
    >
      <div className="font-bold p-3">Blocks</div>
      <ul className="p-0 m-0 w-full list-none">
        {SUPPORTED_NODE_TYPE.map((type, index) => {
          const selected = selectedItemIndex === index
          return (
            <li
              key={type.value}
              onClick={() => selectItem(type.value)}
              className={`p-3 cursor-pointer rounded hover:bg-orange-200 dark:hover:bg-zinc-500 ${
                selected ? 'bg-orange-300 dark:bg-zinc-600' : ''
              }`}
            >
              {type.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}