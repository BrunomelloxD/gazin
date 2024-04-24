import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Landing from './pages/index'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" index element={<Landing />} />
            </Routes>
        </Router>
    )
}

export default App
