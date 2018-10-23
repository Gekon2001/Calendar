const utils = (function () {
    let trueState = {};
    let trueStateCounter = 0;

    const getIntervals = (intervals, start, end ) => {
        if (intervals.length === 0) {
            return [{'bt': start, 'et': end}];
        }
        return (intervals.reduce((newIntervals, interval, index)=>{
            if (interval.et+1 < start) {
                if (newIntervals.length && newIntervals[newIntervals.length-1].et >= end) {
                    newIntervals[newIntervals.length-1]
                    newIntervals.splice(newIntervals.length-1, 1, interval, {'bt': start, 'et': end}); 
                } else {
                    newIntervals.push(interval, {'bt': start, 'et': end}); 
                }
                return (newIntervals);
            }
            if (end+1 < interval.bt) {
                if (newIntervals.length && (newIntervals[newIntervals.length-1].et >= end)) {
                    newIntervals.push(interval); 
                } else {
                    newIntervals.push({'bt': start, 'et': end}, interval); 
                }
                return(newIntervals);
            }

            if (interval.bt <= start && start <= interval.et+1 && end >= interval.et) {
                if (newIntervals.length && (newIntervals[newIntervals.length-1].et >= end)) {
                    newIntervals.splice(newIntervals.length-1, 1, {'bt': interval.bt, 'et': newIntervals[newIntervals.length-1].et}); 

                } else {
                    newIntervals.push({'bt': interval.bt, 'et': end}); 
                }
                return (newIntervals);
            }
            if (interval.bt-1 <= end && end <= interval.et) {
                
                if (newIntervals.length && (newIntervals[newIntervals.length-1].et >= end)) {
                    newIntervals.splice(newIntervals.length-1, 1, {'bt': newIntervals[newIntervals.length-1].bt, 'et': interval.et});
                } else {
                    newIntervals.push({'bt': start, 'et': interval.et}); 
                }
                return (newIntervals);
            }
            if ((start <= interval.bt) && (interval.et <= end)) {
                if (!(newIntervals.length && newIntervals[newIntervals.length-1].et >= end)) {
                    newIntervals.push({'bt': start, 'et': end}); 
                }
                return (newIntervals);
            }
            if ((interval.bt <= start) && ( end <= interval.et)) {
                newIntervals.push(interval);
                return (newIntervals);
            }
        }, []))
    }

    return {
        mouseUp: () => {
            trueStateCounter = 0
        },

        selectHours: (intervals, hours) => {
            let isDone = false;
            trueStateCounter = 0;
            if (intervals.length === 0) {
                intervals.splice(0, 0, {'bt': hours, 'et': hours+59});
                return intervals;
            }
            intervals.map((interval, index) => {
                if (isDone) {return};
                if (hours < interval.bt) {
                    if ((hours + 60) === interval.bt) {
                        intervals[index].bt = hours;
                    } else {
                        intervals.splice(index, 0, {'bt': hours, 'et': hours+59});
                    }
                    isDone = true;
                    return;
                }
                if (hours === interval.bt) {
                    if (intervals[index].et !== hours + 59) {
                        intervals[index].bt += 60;
                    } else {
                        intervals.splice(index, 1);
                    }
                    isDone = true;
                    return;
                }

                if (hours === interval.et+1) {
                    intervals[index].et = hours+59;
                    isDone = true;
                    return;
                }
                if (hours === interval.et-59) {
                    intervals[index].et -= 60;
                    isDone = true;
                    return;
                }

                if ((interval.bt < hours) && (hours+59 < interval.et)) {
                    intervals.splice(index, 1, {'bt': interval.bt, 'et': hours-1}, {'bt': hours+60, 'et': interval.et})
                    isDone = true;
                    return;	
                }
            })

            if ((intervals.length > 1) && (isDone === true)) {
                for (let i = 1; i < intervals.length; i++) {
                    if (intervals[i-1].et + 1 === intervals[i].bt) {
                        intervals.splice(i-1, 2, { 'bt': intervals[i-1].bt, 'et': intervals[i].et, })
                    }
                }
            }

            isDone === false &&	intervals.push({'bt': hours, 'et': hours+59 });
            
            return( intervals );
        },

        chooseInterval: (state, day, hours, startDay, startHours) => {
            let isDone = false;
            if  (trueStateCounter === 0) {
                trueStateCounter = 1;
                trueState = {...state};

            }
            if (trueStateCounter === 1) {
                state = {...trueState};
            }

            if (day === startDay) {
                return ({...state, [day]: getIntervals([...state[day]], startHours < hours ? startHours: hours, startHours > hours ? startHours + 59: hours + 59)});
            }

            let daysName = Object.keys(state);
            let daysInterval = {};
            let start, end, dayCounter = 0;
            daysName.map(dayName=>{
                if (dayCounter === 0 && ((dayName === startDay) || (dayName === day))) {
                    if (dayName === startDay) {
                        start = startHours;
                        end = hours;
                    } else {
                        start = hours;
                        end = startHours
                    }
                    dayCounter++;
                    daysInterval[dayName] = getIntervals(state[dayName], start, 1439);
                    return
                }
                if (dayCounter === 1 && ((dayName === startDay) || (dayName === day))) {
                    daysInterval[dayName] = getIntervals(state[dayName], 0, end+59);
                    dayCounter++;
                    return
                }
                if ((dayCounter === 0) || (dayCounter === 2)) {
                    return
                }
                daysInterval[dayName] = getIntervals(state[dayName], 0, 1439);
            })
            dayCounter = 0;
            return ({...state, ...daysInterval})
        }
    }
})()

export default utils