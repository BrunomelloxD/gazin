import { createContext, useState } from 'react'

import { LevelContextType } from '../types/level.type'

import { Props } from '../types/type'

export const LevelContext = createContext<LevelContextType>({
    id: undefined,
    setId: () => {
        throw new Error('Name not properly initialized')
    },
    level: '',
    setLevel: () => {
        throw new Error('Name not properly initialized')
    }
})

export const LevelDataProvider = ({ children }: Props) => {
    const [level, setLevel] = useState<string>('')
    const [id, setId] = useState<number | undefined>(undefined)
    return (
        <LevelContext.Provider value={{ id, setId, level, setLevel }}>
            {children}
        </LevelContext.Provider>
    )
}
