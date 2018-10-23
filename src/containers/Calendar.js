import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import Calendar from '../components/Calendar.jsx';

const mapStateToProps = (state) => {
    return ({hoursInterval: state})
}

const mapDispatchToProps = (dispatch) => ({
    onClickClear: () => {
        dispatch(actions.clearAll());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);