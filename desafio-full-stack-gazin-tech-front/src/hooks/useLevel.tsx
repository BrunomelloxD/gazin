import { useContext } from 'react'
import { LevelContext } from '../providers/level.provider'

export const useLevelData = () => useContext(LevelContext)
