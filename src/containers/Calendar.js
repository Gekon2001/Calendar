import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import Calendar from '../components/Calendar.jsx';
import {saveAs} from 'file-saver';

let blob;

const mapStateToProps = state => (
    {onClickSave: () => {
        blob = new Blob([JSON.stringify(state)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "HoursInterval.json");
    }}
)

const mapDispatchToProps = (dispatch) => ({
    onClickClear: () => {
        dispatch(actions.clearAll());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);