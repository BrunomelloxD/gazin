import { useEffect, useState } from 'react'
import {
    FiAlignJustify,
    FiArrowUp,
    FiEdit2,
    FiPlus,
    FiTrash
} from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLevelData } from '../../hooks/useLevel'
import api from '../../services/api'
import LabelWithFocus from '../ui/label.focus'

type Level = {
    id: number
    nivel: string
}

const Level = () => {
    const [isOpenLevel, setIsOpenLevel] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenList, setIsOpenList] = useState(false)
    const [levelName, setLevelsName] = useState<string>()
    const [levelNameToEdit, setLevelsNameToEdit] = useState<string>()
    const [levels, setLevels] = useState<Level[]>([])

    const { id, level } = useLevelData()
    console.log(id, level)
    useEffect(() => {
        api.get('/api/niveis').then(response => {
            setLevels(response.data)
        })
    }, [])

    const handleEdit = async (id: number) => {
        const data = {
            nivel: levelNameToEdit
        }
        await api.patch(`/api/niveis/${id}`, data)
        await api.get('/api/niveis').then(response => {
            setLevels(response.data)
        })
        setLevelsNameToEdit('')
        return
    }

    const handleCreate = async () => {
        const data = {
            nivel: levelName
        }

        const response = await api.post('/api/niveis', data)

        if (response.status === 400) {
            alert('Error: Bad Request')
        } else {
            setLevelsName('')
            setLevels([...levels, response.data])
        }
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevelsName(event.target.value)
    }

    const handleDelete = (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este level?')) {
            return
        }

        api.delete(`/api/niveis/${id}`)
            .then(response => {
                if (response.status === 400 || response.status === 404) {
                    alert(response.data)
                } else {
                    setLevels(levels.filter(level => level.id !== id))
                }
            })
            .catch(_error => {
                console.log(_error)
                alert(
                    'Nível associado a um desenvolvedor. Por favor, exclua o desenvolvedor primeiro.'
                )
            })
    }

    const toggleAccordion = () => {
        setIsOpenLevel(!isOpenLevel)
    }

    const toggleCreate = () => {
        setIsOpenCreate(!isOpenCreate)
    }

    const toggleList = () => {
        setIsOpenList(!isOpenList)
    }

    return (
        <main className="w-full md:px-80 py-6">
            <div className="border-2 rounded-md rad p-8">
                <div
                    id="mainHeading"
                    className="flex justify-between items-center w-full "
                    onClick={toggleAccordion}
                    style={{ cursor: 'pointer' }}
                >
                    <div>
                        <p className="flex justify-center items-center font-medium text-base leading-6 md:leading-4 text-gray-800">
                            <span className="lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-gray-800">
                                Levels
                            </span>
                        </p>
                    </div>
                    <button aria-label="toggler" data-menu>
                        {isOpenLevel ? (
                            <FiArrowUp size={22} />
                        ) : (
                            <FiPlus size={22} />
                        )}
                    </button>
                </div>

                <div
                    id="menu"
                    className={`mt-6 w-full ${
                        isOpenLevel ? 'block' : 'hidden'
                    }`}
                >
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
                            className={`mt-6 w-full ${
                                isOpenCreate ? 'block' : 'hidden'
                            }`}
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

                                        <LabelWithFocus placeholder="Nome" />
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

                    <hr className="border-gray-200 my-4" />

                    <div className="border-2 rounded-md rad p-5">
                        <div
                            id="mainHeading"
                            className="flex justify-between items-center w-full "
                            onClick={toggleList}
                            style={{ cursor: 'pointer' }}
                        >
                            <p className="flex font-normal justify-center items-center text-base leading-6 md:leading-4 text-gray-900">
                                Lista de niveis
                            </p>

                            <button aria-label="toggler" data-menu>
                                {isOpenList ? (
                                    <FiAlignJustify size={18} />
                                ) : (
                                    <FiPlus size={18} />
                                )}
                            </button>
                        </div>
                        <div
                            id="menu"
                            className={`mt-6 w-full ${
                                isOpenList ? 'block' : 'hidden'
                            }`}
                        >
                            <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
                                {levels.map(level => (
                                    <li className="flex justify-between items-center px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                                        <p>{level.nivel}</p>
                                        <section className="flex gap-2 items-center">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">
                                                        <FiEdit2 size={18} />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Editar Nivel
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Digite o nome
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label
                                                                htmlFor="name"
                                                                className="text-right text-lg"
                                                            >
                                                                Nome
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                onChange={event => {
                                                                    setLevelsNameToEdit(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            onClick={() => {
                                                                handleEdit(
                                                                    level.id
                                                                )
                                                            }}
                                                            type="submit"
                                                        >
                                                            Editar
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Button
                                                onClick={() =>
                                                    handleDelete(level.id)
                                                }
                                                variant="outline"
                                            >
                                                <FiTrash
                                                    size={18}
                                                    className="text-red-400"
                                                />
                                            </Button>
                                        </section>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Level
