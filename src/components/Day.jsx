import React from 'react';



const addClass = (intervals, hours) => {
    let className = "";
    intervals.forEach(interval => {
        if (interval.bt <= hours && hours <= interval.et) {
            className = 'selected';
        }
    })
    return (className);
}

const Day = ({hoursInterval, onClickDay, onClick, onMouseEnter, onMouseDown, onMouseUp, name}) => {
    let jsxHours = [];
    let selected = hoursInterval[name].length > 0 ? 'selected' : '';
    let selectedAll = (hoursInterval[name].length === 1 && hoursInterval[name][0].bt === 0 && hoursInterval[name][0].et === 1439) ? 'selected': "";

    for (let i = 0; i < 24; i++) {
        jsxHours.push(
            <div 
                className={'day__hours ' + addClass(hoursInterval[name], i*60)} 
                key={i}
                onClick={onClick.bind(null, name, i*60)}
                onMouseEnter={onMouseEnter.bind(null, name, i*60)}
                onMouseDown={(e)=>{onMouseDown(e, name, i*60)}}
                onMouseUp={onMouseUp}>
                {i}
            </div>
        )
    }

    return ( 
        <React.Fragment>
            <div className={'day__name ' + selected}>{name}</div>
            <div 
                className={'day__all ' + selectedAll}
                onClick={onClickDay.bind(null, name)}>
            </div>
            {jsxHours}
        </React.Fragment>
    )
}

export default Day