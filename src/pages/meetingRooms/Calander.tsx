/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';


const handleSelect = (date: any) => {
    console.log(date)
}

const Calander = () => {
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    return (
        <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
        />
    )
}

export default Calander