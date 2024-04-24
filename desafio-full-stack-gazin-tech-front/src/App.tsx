import './global.css'
import { LevelDataProvider } from './providers/level.provider'
import Routes from './routes'

const App = () => {
    return (
        <LevelDataProvider>
            <Routes />
        </LevelDataProvider>
    )
}

export default App
