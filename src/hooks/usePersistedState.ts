import React from 'react'

export const usePersistedState = <T>(initialState: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = React.useState<T>(() => {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }

    return initialState
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
