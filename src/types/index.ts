import { Session } from '@supabase/supabase-js'

import { usePageState } from '@/hooks'

export type NodeType =
  | 'text'
  | 'image'
  | 'list'
  | 'page'
  | 'heading1'
  | 'heading2'
  | 'heading3'

export type NodeData = {
  id: string
  type: NodeType
  value: string
}

export type NodeProps = {
  node: NodeData
  updateFocusedIndex(index: number): void
  isFocused: boolean
  index: number
}

export type Page = {
  id: string
  slug: string
  title: string
  nodes: NodeData[]
  cover: string
}

export type AppStateContextT = ReturnType<typeof usePageState>

export type SupportedNodeType = {
  value: NodeType
  name: string
}

export type AuthSessionContextValue = {
  session: Session | null
  loading: boolean
}

export type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
}

//debounce type
// eslint-disable-next-line
export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any // eslint-disable-line
  ? A
  : never

export type InjectedProps = {
  initialState: Page
}

export type PropsWithoutInjected<TBaseProps> = Omit<
  TBaseProps,
  keyof InjectedProps
>
