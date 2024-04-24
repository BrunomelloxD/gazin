import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
    FiAlignJustify,
    FiArrowDown,
    FiEdit2,
    FiPlus,
    FiTrash
} from 'react-icons/fi'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import api from '../../services/api'
import LabelWithFocus from '../ui/label.focus'

type Level = {
    id: number
    nivel: string
}

type Developers = {
    id: number
    nome: string
    datanascimento: string
    nivel: number
    sexo: string
    idade: number
    hobby: string
}

const Developer = () => {
    const [isOpenLevel, setIsOpenLevel] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenList, setIsOpenList] = useState(false)
    const [date, setDate] = useState<Date>()
    const [name, setName] = useState('')
    const [developerLevel, setDeveloperLevel] = useState('')
    const [gender, setGender] = useState('')
    const [hobby, setHobby] = useState('')
    const [levels, setLevels] = useState<Level[]>([])
    const [developers, setDevelopers] = useState<Developers[]>([])

    const [nameToEdit, setNameToEdit] = useState('')
    const [genderToEdit, setGenderToEdit] = useState('')
    const [developerLevelToEdit, setDeveloperLevelToEdit] = useState('')
    const [hobbyToEdit, setHobbyToEdit] = useState('')

    const formatDate = (selectedDate: Date) => {
        return format(selectedDate, 'yyyy-MM-dd', { locale: ptBR })
    }

    const handleUpdate = async (id: number) => {
        const formattedDate = date ? formatDate(date) : ''

        const data = {
            nome: nameToEdit,
            datanascimento: formattedDate,
            nivel: +developerLevelToEdit,
            sexo: genderToEdit,
            hobby: hobbyToEdit
        }

        await api.patch(`/api/desenvolvedores/${id}`, data)
        api.get('api/desenvolvedores').then(response => {
            setDevelopers(response.data)
        })
    }

    const handleCreate = async () => {
        const formattedDate = date ? formatDate(date) : ''

        const data = {
            nome: name,
            datanascimento: formattedDate,
            nivel: +developerLevel,
            sexo: gender,
            hobby: hobby
        }

        await api.post('/api/desenvolvedores', data)
        api.get('api/desenvolvedores').then(response => {
            setDevelopers(response.data)
        })

        setIsOpenCreate(false)
    }

    const handleDelete = async (id: number) => {
        await api.delete(`/api/desenvolvedores/${id}`)

        api.get('api/desenvolvedores').then(response => {
            setDevelopers(response.data)
        })
    }

    useEffect(() => {
        api.get('/api/niveis').then(response => {
            setLevels(response.data)
        })
    }, [])

    useEffect(() => {
        api.get('api/desenvolvedores').then(response => {
            setDevelopers(response.data)
        })
    }, [])

    const toggleAccordion = () => {
        setIsOpenLevel(!isOpenLevel)
    }

    const toggleList = () => {
        setIsOpenList(!isOpenList)
    }

    const toggleCreate = () => {
        setDate(undefined)
        setIsOpenCreate(!isOpenCreate)
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
                                Desenvolvedores
                            </span>
                        </p>
                    </div>
                    <button aria-label="toggler" data-menu>
                        {isOpenLevel ? (
                            <FiArrowDown size={22} />
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
                                Cadastrar novo desenvolvedor
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
                                <div>
                                    <p className="block mb-2 font-medium text-base text-gray-600">
                                        Nome:
                                    </p>
                                    <div className="w-72">
                                        <div className="relative h-10 w-full min-w-[200px]">
                                            <input
                                                value={name}
                                                onChange={e =>
                                                    setName(e.target.value)
                                                }
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" "
                                            />
                                            <LabelWithFocus placeholder="Digite o nome" />
                                        </div>

                                        <p className="block mb-2 font-medium text-base text-gray-600">
                                            Sexo:
                                        </p>

                                        <div className="relative h-10 w-full min-w-[200px]">
                                            <input
                                                value={gender}
                                                onChange={e =>
                                                    setGender(e.target.value)
                                                }
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" "
                                            />
                                            <LabelWithFocus placeholder="Digite o sexo" />
                                        </div>

                                        <label className="block mb-2 font-medium text-base leading-6 text-gray-600">
                                            Nivel
                                        </label>

                                        <Select
                                            onValueChange={value =>
                                                setDeveloperLevel(value)
                                            }
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {levels.map(level => (
                                                        <SelectItem
                                                            key={level.id}
                                                            value={String(
                                                                level.id
                                                            )}
                                                        >
                                                            {level.nivel}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <p className="block mb-2 font-medium text-base text-gray-600">
                                            Hobby:
                                        </p>

                                        <div className="relative h-10 w-full min-w-[200px]">
                                            <input
                                                value={hobby}
                                                onChange={e =>
                                                    setHobby(e.target.value)
                                                }
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" "
                                            />
                                            <LabelWithFocus placeholder="Digite o hobby" />
                                        </div>

                                        <p className="block my-2 font-medium text-base text-gray-600">
                                            Data de nascimento:
                                        </p>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-[280px] justify-start text-left font-normal',
                                                        !date &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? (
                                                        format(
                                                            date,
                                                            'yyyy-MM-dd'
                                                        )
                                                    ) : (
                                                        <span>
                                                            Escolha uma data
                                                        </span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    defaultMonth={date}
                                                    mode="single"
                                                    locale={ptBR}
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                    required
                                                    disabled={date =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                '1900-01-01'
                                                            )
                                                    }
                                                />
                                            </PopoverContent>
                                            <span className="text-xs text-gray-500">
                                                Sua data de nascimento é usada
                                                para calcular sua idade.
                                            </span>
                                        </Popover>
                                    </div>
                                </div>
                            </section>

                            <div
                                className="flex justify-center items-center mt-6"
                                onClick={handleCreate}
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
                                Lista de desenvolvedores
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
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Nome
                                        </TableHead>
                                        <TableHead>Nível</TableHead>
                                        <TableHead>Sexo</TableHead>
                                        <TableHead>
                                            Data de nascimento
                                        </TableHead>
                                        <TableHead>Hobby</TableHead>
                                        <TableHead>Idade</TableHead>
                                        <TableHead className="text-right">
                                            Editar
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Deletar
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {developers.map(developer => (
                                        <TableRow key={developer.id}>
                                            <TableCell>
                                                {developer.nome}
                                            </TableCell>
                                            <TableCell>
                                                {developer.nivel}
                                            </TableCell>
                                            <TableCell>
                                                {developer.sexo}
                                            </TableCell>
                                            <TableCell>
                                                {developer.datanascimento}
                                            </TableCell>
                                            <TableCell>
                                                {developer.hobby}
                                            </TableCell>
                                            <TableCell>
                                                {developer.idade}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline">
                                                            <FiEdit2
                                                                size={18}
                                                            />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Editar
                                                            </DialogTitle>
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
                                                                        setNameToEdit(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="name"
                                                                    className="text-right text-lg"
                                                                >
                                                                    Sexo
                                                                </Label>
                                                                <Input
                                                                    id="gender"
                                                                    onChange={event => {
                                                                        setGenderToEdit(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="name"
                                                                    className="text-right text-lg"
                                                                >
                                                                    Nível
                                                                </Label>
                                                                <Select
                                                                    onValueChange={value =>
                                                                        setDeveloperLevelToEdit(
                                                                            value
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Selecione..." />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            {levels.map(
                                                                                level => (
                                                                                    <SelectItem
                                                                                        key={
                                                                                            level.id
                                                                                        }
                                                                                        value={String(
                                                                                            level.id
                                                                                        )}
                                                                                    >
                                                                                        {
                                                                                            level.nivel
                                                                                        }
                                                                                    </SelectItem>
                                                                                )
                                                                            )}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="name"
                                                                    className="text-right text-lg"
                                                                >
                                                                    Hobby
                                                                </Label>
                                                                <Input
                                                                    id="gender"
                                                                    onChange={event => {
                                                                        setHobbyToEdit(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label
                                                                    htmlFor="name"
                                                                    className="text-right text-lg"
                                                                >
                                                                    Aniversário
                                                                </Label>
                                                                <Popover>
                                                                    <PopoverTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant={
                                                                                'outline'
                                                                            }
                                                                            className={cn(
                                                                                'w-[280px] justify-start text-left font-normal',
                                                                                !date &&
                                                                                    'text-muted-foreground'
                                                                            )}
                                                                        >
                                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                                            {date ? (
                                                                                format(
                                                                                    date,
                                                                                    'yyyy-MM-dd'
                                                                                )
                                                                            ) : (
                                                                                <span>
                                                                                    Escolha
                                                                                    uma
                                                                                    data
                                                                                </span>
                                                                            )}
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0">
                                                                        <Calendar
                                                                            defaultMonth={
                                                                                date
                                                                            }
                                                                            mode="single"
                                                                            locale={
                                                                                ptBR
                                                                            }
                                                                            selected={
                                                                                date
                                                                            }
                                                                            onSelect={
                                                                                setDate
                                                                            }
                                                                            initialFocus
                                                                            required
                                                                            disabled={date =>
                                                                                date >
                                                                                    new Date() ||
                                                                                date <
                                                                                    new Date(
                                                                                        '1900-01-01'
                                                                                    )
                                                                            }
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                onClick={() => {
                                                                    handleUpdate(
                                                                        developer.id
                                                                    )
                                                                }}
                                                                type="submit"
                                                            >
                                                                Editar
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    onClick={() =>
                                                        handleDelete(
                                                            developer.id
                                                        )
                                                    }
                                                    variant="outline"
                                                >
                                                    <FiTrash
                                                        size={18}
                                                        className="text-red-400"
                                                    />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Developer
