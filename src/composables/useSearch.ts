import { type Ref, ref, watch, type ComputedRef } from 'vue'

export const useSearch = <T>(searchFields: (keyof T)[], array: Ref<T[]> | ComputedRef<T[]>) => {
  const searchTerm = ref('')
  const isSearching = ref(false)
  const searchItems = ref<T[]>([]) as Ref<T[]>

  function search(searchTerm: string, array: T[]) {
    isSearching.value = true

    if (!searchTerm) {
      isSearching.value = false
      return []
    }

    searchTerm = searchTerm.toString().trim().toLowerCase()

    return array.filter((item: T) => {
      return searchFields.some((field) => {
        const fieldValue = item[field]
        return fieldValue && fieldValue.toString().toLowerCase().includes(searchTerm)
      })
    })
  }

  watch(searchTerm, () => {
    searchItems.value = search(searchTerm.value, array.value)
  })

  return { isSearching, searchItems, searchTerm }
}
