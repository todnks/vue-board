import useBoardStore from './board'
import usePaginationStore from './pagination'
import useTableStore from './table'
import useUserStore from './user'
import { storeToRefs } from 'pinia'

const getStore = (moduleName) => {
  const stores = {
    board: useBoardStore(),
    pagination: usePaginationStore(),
    table: useTableStore(),
    user: useUserStore()
  }

  return stores[moduleName]
}

export const useState = (moduleName) => storeToRefs(getStore(moduleName))
export const useGetters = (moduleName) => storeToRefs(getStore(moduleName))
export const useActions = (moduleName) => getStore(moduleName)
