import React from 'react';
import Days from './Days.jsx';

const calendarBodyTitle = (
    <div className="calendar__body-title">
        <div></div>
        <div>All day</div>
        <div>00:00</div>
        <div>03:00</div>
        <div>06:00</div>
        <div>09:00</div>
        <div>12:00</div>
        <div>15:00</div>
        <div>18:00</div>
        <div>21:00</div>
    </div>
);


const Calendar = ({onClickClear, onClickSave}) => (
    <div className='calendar'>
        <div className="calendar__title">
            Set Schedule
        </div>
        <div className="calendar__body">
            {calendarBodyTitle}
            <Days/>
        </div>
        <div 
            className="calendar__btn" 
            onClick={onClickClear}>
            Clear
        </div>
        <div 
            className="calendar__btn"
            onClick={onClickSave}>
            Save Changes
        </div>
    </div>
)

export default Calendar;