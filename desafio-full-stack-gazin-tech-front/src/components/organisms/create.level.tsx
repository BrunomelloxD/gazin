import api from '@/services/api'
import { useState } from 'react'
import { FiAlignJustify, FiPlus } from 'react-icons/fi'

const CreateLevel = () => {
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [levelName, setLevelsName] = useState<string>()
    const toggleCreate = () => {
        setIsOpenCreate(!isOpenCreate)
    }
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevelsName(event.target.value)
    }
    const [levelNameIsEmpty, setLevelNameIsEmpty] = useState(false)
    const handleCreate = async () => {
        if (levelName === undefined || levelName === '') {
            setLevelNameIsEmpty(true)
            return
        }

        const data = {
            nivel: levelName
        }

        const response = await api.post('/api/niveis', data)

        if (response.status === 400) {
            alert('Error: Bad Request')
        } else {
            setLevelsName('')
            setLevelNameIsEmpty(false)
            // setLevels([...levels, response.data])
        }
    }

    return (
        <div className="border-2 rounded-md rad p-5">
            <div
                id="mainHeading"
                className="flex justify-between items-center w-full "
                onClick={toggleCreate}
                style={{ cursor: 'pointer' }}
            >
                <p className="flex font-normal justify-center items-center text-base leading-6 md:leading-4 text-gray-900">
                    Criar novo nível
                </p>

                <button aria-label="toggler" data-menu>
                    {isOpenCreate ? (
                        <FiAlignJustify size={18} />
                    ) : (
                        <FiPlus size={18} />
                    )}
                </button>
            </div>
            <div
                id="menu"
                className={`mt-6 w-full ${isOpenCreate ? 'block' : 'hidden'}`}
            >
                <section className="flex flex-col justify-center items-center gap-2 text-base leading-6 text-gray-600 font-normal">
                    Digite o nome do novo level:
                    <div className="w-72 mt-2">
                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                value={levelName}
                                onChange={handleChangeName}
                                className="peer h-full w-full rounded-[7px] border 
                                            bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />

                            <label
                                className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight ${
                                    levelNameIsEmpty
                                        ? 'text-red-400'
                                        : 'text-blue-gray-400'
                                } transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}
                            >
                                Digite o nome
                            </label>
                        </div>
                    </div>
                </section>

                <div
                    onClick={handleCreate}
                    className="flex justify-center items-center mt-6"
                >
                    <button className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
                        Criar
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-slate-300/30"></div>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CreateLevel
