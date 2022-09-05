import React, { ChangeEventHandler, FC, ReactElement } from 'react';
import './MatchesRequestedInput.css'

type MatchesRequestedProps = {
    selectOnChange: ChangeEventHandler<HTMLSelectElement>
}

const MatchesRequestedInput: FC<MatchesRequestedProps> = ({selectOnChange}): ReactElement => {
    return (
        <div className='matchesRequestedContainer'>
            <label className="matchesRequestedLabel"># of Matches Requested:</label>
            <select onChange={selectOnChange}>
            <option value={5}>
                5
            </option>
            <option value={10}>
                10
            </option>
            <option value={15}>
                15
            </option>
            <option value={20}>
                20
            </option>
            </select>
        </div>
    )
}

export default MatchesRequestedInput;