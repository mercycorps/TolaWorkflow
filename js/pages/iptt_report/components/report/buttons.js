import React from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import { BootstrapPopoverButton } from '../../../../components/helpPopover';

class PinPopover extends React.Component {
    NOT_SENT = 0;
    SENDING = 1;
    SENT = 2;
    FAILED = 3;
    constructor(props) {
        super(props);
        this.state = {
            reportName: '',
            status: this.NOT_SENT
        };
    }
    handleChange = (e) => {
        this.setState({reportName: e.target.value});
    }
    isDisabled = () => {
        return !this.props.routeStore.pinData || !this.state.reportName;
    }
    handleClick = () => {
        this.setState({status: this.SENDING});
        $.ajax({
            type: "POST",
            url: this.props.routeStore.pinUrl,
            data: {name: this.state.reportName, ...this.props.routeStore.pinData },
            success: () => {
                this.setState({status: this.SENT});
                this.props.updatePosition();
            },
            error: (ev) => {
                this.setState({status: this.FAILED});
                console.log("ajax error:", ev);
                }
        });
    }
    render() {
        return (
            <React.Fragment>
            {(() => {
            switch(this.state.status) {
                case this.SENT:
                    return (
                        <div className="form-group">
                            <p><span>

                                {/* # Translators: The user has successfully "pinned" a report link to a program page for quick access to the report */}
                                {gettext('Success!  This report is now pinned to the program page')}

                            </span></p>
                            <p><a href={ this.props.filterStore.programPageUrl }>

                                    {/* # Translators: This is not really an imperative, it's an option that is available once you have pinned a report to a certain web page */}
                                    {gettext('Visit the program page now.')}

                            </a></p>
                        </div>
                    );
                case this.FAILED:
                    return (
                        <div className="form-group">
                            <p><span>
                                {
                                    gettext('Something went wrong when attempting to pin this report')
                                }
                            </span></p>
                        </div>
                    );
                case this.NOT_SENT:
                    return (
                        <React.Fragment>
                            <div className="form-group">
                                <label className="">
                                    {
                                        /* # Translators: a field where users can name their newly created report */
                                        gettext('Report name')
                                    }
                                </label>
                                <input type="text" className="form-control"
                                     value={ this.state.reportName }
                                     onChange={ this.handleChange }
                                     disabled={ this.state.sending }/>
                            </div>
                            <button type="button"
                                      onClick={ this.handleClick }
                                      disabled={ this.isDisabled() }
                                      className="btn btn-primary btn-block">
                                        {
                                            gettext('Pin to program page')
                                        }
                            </button>
                        </React.Fragment>
                    );
                case this.SENDING:
                    return (
                        <div className="btn btn-primary" disabled>
                            <img src='/static/img/ajax-loader.gif' />&nbsp;
                                { gettext('Sending') }
                        </div>
                    );
                }
            })()}
            </React.Fragment>
        );
    }
}


@inject('filterStore', 'routeStore')
export class PinButton extends BootstrapPopoverButton {
    popoverName = 'pin';

    getPopoverContent = () => {
        return (
            <PinPopover
                filterStore={this.props.filterStore}
                routeStore={this.props.routeStore}
                updatePosition={() => {$(this.refs.target).popover('update');}}
            />
            );
    }

    render() {
        return (
            <React.Fragment>
                <button
                    href="#"
                    className="btn btn-sm btn-secondary"
                    ref="target">
                <i className="fas fa-thumbtack"></i>
                    {
                        /* # Translators: a button that lets a user "pin" (verb) a report to their home page */
                        gettext('Pin')
                    }
                </button>
            </React.Fragment>
        );
    }
}


@observer
class ExcelPopover extends React.Component {
    getCurrent = () => {
        if (this.props.routeStore.excelUrl) {
            window.open(this.props.routeStore.excelUrl, '_blank');
        }
    }

    getAll = () => {
        if (this.props.routeStore.fullExcelUrl) {
            window.open(this.props.routeStore.fullExcelUrl, '_blank');
        }
    }
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary btn-block" onClick={ this.getCurrent }>
                    {
                        /* # Translators: a download button for a report containing just the data currently displayed */
                        gettext('Current view')
                    }
                </button>
                <button type="button" className="btn btn-primary btn-block" onClick={ this.getAll }>
                    {
                        /* # Translators: a download button for a report containing all available data */
                        gettext('All program data')
                    }
                </button>
            </div>
        );
    }
}

@inject('filterStore', 'routeStore')
@observer
export class ExcelPopoverButton extends BootstrapPopoverButton {
    popoverName = 'excel';

    getPopoverContent = () => {
        return (
            <ExcelPopover
                filterStore={this.props.filterStore}
                routeStore={this.props.routeStore} />
            );
    }

    render() {
        return (
            <React.Fragment>
                <button type="button"
                     className="btn btn-sm btn-secondary"
                     ref="target">
                     <i className="fas fa-download"></i> Excel
                     </button>
            </React.Fragment>
        );
    }
}


@inject('routeStore')
@observer
export class ExcelButton extends React.Component {
     handleClick = () => {
        if (this.props.routeStore.excelUrl) {
            window.open(this.props.routeStore.excelUrl, '_blank');
        }
    }

    render() {
        return (
            <React.Fragment>
                <button type="button"
                     className="btn btn-sm btn-secondary"
                     onClick={this.handleClick }>
                     <i className="fas fa-download"></i> Excel
                     </button>
            </React.Fragment>
        );
    }
}
