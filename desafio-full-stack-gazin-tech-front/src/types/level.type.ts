import React from 'react'

export interface LevelContextType {
    id: number | undefined
    setId: React.Dispatch<React.SetStateAction<number | undefined>>
    level: string
    setLevel: React.Dispatch<React.SetStateAction<string>>
}
