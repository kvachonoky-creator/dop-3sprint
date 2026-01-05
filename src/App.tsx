import { useState } from 'react';
import './App.css';
import { Country } from "./Country";
import { v1 } from "uuid";

export type BanknotsType = "USD" | "RUB" | "All"
export type MoneyType = {
    banknote: BanknotsType
    nominal: number
    id: string
}

let defaultMoney: MoneyType[] = [
    { banknote: 'USD', nominal: 100, id: v1() },
    { banknote: 'USD', nominal: 100, id: v1() },
    { banknote: 'RUB', nominal: 100, id: v1() },
    { banknote: 'USD', nominal: 100, id: v1() },
    { banknote: 'USD', nominal: 100, id: v1() },
    { banknote: 'RUB', nominal: 100, id: v1() },
    { banknote: 'USD', nominal: 100, id: v1() },
    { banknote: 'RUB', nominal: 100, id: v1() },
]


export const moneyFilter = (money: MoneyType[], filter: BanknotsType): MoneyType[] => {
    // switch (filter) {
    //     case "RUB":
    //         return money.filter(m => m.banknote === "RUB")
    //     case "USD":
    //         return money.filter(m => m.banknote === "USD")
    //     default:
    //         return money
    // }

    return filter === "All" ? money : money.filter(m => m.banknote === filter)

}


export const App = () => {
    const [money, setMoney] = useState<MoneyType[]>(defaultMoney)
    const [filterValue, setFilterValue] = useState<BanknotsType>('All')

    const filteredMoney = moneyFilter(money, filterValue)

    const addMoney = (banknote: BanknotsType) => {
        setMoney([...money, { banknote, nominal: 100, id: v1() }])
    }

    const removeMoney = (banknote: BanknotsType) => {
        const index = money.findIndex(el => el.banknote === banknote)
        if (index !== -1) {
            setMoney(money.filter((el, i) => i !== index))
        }
    }

    return (
        <div className="App">
            <Country
                data={filteredMoney}   //отрисовать будем деньги после фильтрации
                setFilterValue={(value) => setFilterValue(value)}  //useState передаем? Так можно было?!
                addMoney={addMoney}
                removeMoney={removeMoney}
            />
        </div>
    );
}
