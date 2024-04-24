import api from '@/services/api'
import Developer from '../components/templates/developer'
import Level from '../components/templates/level'
import Navbar from '../components/templates/navbar'
import { useLevelData } from '../hooks/useLevel'
import { LevelContextType } from '../types/level.type'

import { useQuery } from 'react-query'

const fetchLevels = async () => {
    const response = await api.get<LevelContextType>('/api/niveis')
    return response.data
}

function App() {
    const { setId, setLevel } = useLevelData()
    const { data, isSuccess } = useQuery('levels', fetchLevels)

    if (isSuccess) {
        setId(data.id)
        setLevel(data.level)
    }

    return (
        <main>
            <Navbar />
            <Level />
            <Developer />
        </main>
    )
}

export default App
