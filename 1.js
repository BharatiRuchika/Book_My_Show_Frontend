import React, {Component} from "react";
import DatePicker from "react-datepicker";
import {addElement} from "../../helpers/DynamicElementsHelper";
import moment from "moment";
const uuid = require('uuid/v1');

require('react-datepicker/dist/react-datepicker.css');

class Fixtures extends Component {

    constructor() {
        super();
        Fixtures.addMatch = Fixtures.addMatch.bind(this);
        this.state = {
            startDate: moment()
        };
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    static addMatch() {
        let html = "<div className=\"form-group\"><label className=\"control-label\">Add Match</label>" +
            "<DatePicker selected={this.state.startDate} onChange={this.handleChange.bind(this)} /></div>";
        addElement('fixture-parent', 'newMatch', uuid(), html);
    }

    render() {
        return (
            <div className="tray tray-center">
                <div className="row">
                    <div className="col-md-8">
                        <div className="panel mb25 mt5">
                            <div className="panel-heading">
                                <span className="panel-title">Fixtures</span>
                                <p>A list of fixtures currently on the system, pulled in via ajax from Ratpack</p>
                            </div>
                            <div className="panel-body p20 pb10">
                                <div id="fixture-parent" className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label">Add Match</label>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChange.bind(this)}/>
                                    </div>
                                    </div>
                            </div>
                            <button onClick={Fixtures.addMatch }>Add Match</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    }