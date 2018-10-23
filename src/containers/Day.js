import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import Day from '../components/Day.jsx';


let startDay, startHours, isMouseDown = 0;

const mapStateToProps = state => {
    return ({hoursInterval: state})
}

const mapDispatchToProps = dispatch => ({
    onMouseDown: (e, day, hours) => {
        e.preventDefault();
        if (!e.target.classList.contains("selected")) {
            isMouseDown++
            startDay = day;
            startHours = hours;
       }
    },
    onMouseEnter: (day, hours) => {
        if (isMouseDown) {
            isMouseDown++
            dispatch(actions.mouseMove(day, hours, startDay, startHours));
        }
    },
    onMouseUp: () => {
        if (isMouseDown > 1) {
            dispatch(actions.mouseUp());
        }
        isMouseDown = 0;
    },
    onClick: (day, hours) => {
        dispatch(actions.toggleHours(day, hours));
    },
    onClickDay: (day) => {
        dispatch(actions.toggleDay(day));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Day);