import React from 'react';
import Day from '../containers/Day';

const Days = () => {

    let days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

    return (   
        <React.Fragment>
            {days.map((item) => (
                <div className="day" key={item}>
                    <Day name={item}/>
                </div>
            ))}
        </React.Fragment>
    )
}

export default Days;