import React from 'react'
import { observer } from "mobx-react"
import Select from 'react-select'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const statusOptions = [
    {value: 'proposed', label: gettext('Proposed')},
    {value: 'active', label: gettext('Active')},
    {value: 'acheived', label: gettext('Achieved')},
]

const ErrorFeedback = observer(({errorMessages}) => {
    if (!errorMessages) {
        return null
    }
    return (
    <div className="invalid-feedback">
        {errorMessages.map((message, index) =>
            <span key={index}>{message}</span>
        )}
    </div>
    )
})

@observer
class StrategicObjectiveForm extends React.Component {
    constructor(props) {
        super(props)
        const {objective} = props

        this.state = {
            managed_data: {...objective},
        }
    }

    updateFormField(fieldKey, value) {
        const {managed_data} = this.state
        const modified = Object.assign(managed_data, {[fieldKey]: value})
        this.setState({managed_data: modified})
    }

    formErrors(fieldKey) {
        return this.props.errors[fieldKey]
    }

    resetForm() {
        this.props.clearErrors()
        const {objective} = this.props
        this.setState({managed_data: {...objective}})
    }

    render() {
        const {objective, expanded, expandAction, deleteAction, saveObjective, createObjective} = this.props
        const {managed_data} = this.state
        const objective_status = managed_data.status
        const selectedStatus = objective_status ? statusOptions.find(x=>x.value==objective_status) : {}
        return (
        <div className="edit-strategic-objective__row">
            <div className="row-expand__toggle">
                <span onClick={expandAction}>
                    <FontAwesomeIcon icon={expanded ? 'caret-down' : 'caret-right'} />
                </span>
            </div>
            <div className="row__content">
            <a onClick={expandAction} tabIndex="0">
                {(objective.id == 'new')? "New Strategic Objective" : objective.name}
            </a>
            { expanded && (
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="objective-name-input">
                            {gettext("Code")}*
                        </label>
                        <input
                            id="objective-name-input"
                            className={classNames('form-control', {'is-invalid':this.formErrors('name')})}
                            value={managed_data.name}
                            onChange={(e) => this.updateFormField('name', e.target.value)}
                            type="text"
                            required
                        />
                        <ErrorFeedback errorMessages={this.formErrors('name')} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="objective-description-input">
                            {gettext("Objective")}*
                        </label>
                        <textarea
                            id="objective-description-input"
                            className={classNames('form-control', {'is-invalid': this.formErrors('description')})}
                            value={managed_data.description}
                            onChange={(e) => this.updateFormField('description', e.target.value)}
                            type="text"
                        />
                        <ErrorFeedback errorMessages={this.formErrors('description')} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="objective-status-input">{gettext("Status")}</label>
                        <Select
                            value={selectedStatus}
                            options={statusOptions}
                            onChange={(e) => this.updateFormField('status', e.value) }
                            className={classNames('react-select', {'is-invalid': this.formErrors('status')})}
                            id="objective-status-input"
                        />
                        <ErrorFeedback errorMessages={this.formErrors('status')} />
                    </div>
                    <div className="objective-form-buttons">
                        {objective.id=='new' && (
                            <div className="form-group btn-row">
                                <button className="btn btn-primary" type="button" onClick={() => createObjective(managed_data)}>{gettext("Save Changes")}</button>
                            </div>
                        )}
                        {objective.id!='new' && (
                            <div className="form-group btn-row">
                                <button className="btn btn-primary" type="button" onClick={() => saveObjective(managed_data)}>{gettext("Save Changes")}</button>
                                <button className="btn btn-reset" type="button" onClick={()=> this.resetForm()}>{gettext("Reset")}</button>
                            </div>
                        )}
                        <div className="right-buttons">
                            <a tabIndex="0" onClick={deleteAction} className="btn btn-link btn-danger">
                                <FontAwesomeIcon icon={'trash'} /> {gettext("Delete")}
                            </a>
                        </div>
                    </div>
                </form>
            )}
            </div>
        </div>
        )
    }
}

@observer
export default class EditObjectives extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded_id: null,
        }
    }

    toggleExpand(id) {
        this.props.clearErrors()
        const {expanded_id} = this.state
        if (id == expanded_id) {
            this.setState({expanded_id: null})
        } else {
            this.setState({expanded_id: id})
        }
    }

    addObjective() {
        this.props.clearErrors()
        this.props.addObjective()
        this.setState({expanded_id: 'new'})
    }

    deleteObjectiveAction(objectiveId) {
        if (objectiveId=='new') {
            this.props.onDelete(objectiveId)
            return
        }
        if(confirm(gettext("Delete Strategic Objective?"))) {
            this.props.onDelete(objectiveId)
        }
    }

    updateObjective(objectiveId, data)
    {
        this.props.onUpdate(objectiveId, data)
    }

    createObjective(data)
    {
        let objectiveData = Object.assign(data, {country: this.props.country_id})
        this.props.onCreate(objectiveData)
    }

    render() {
        const {expanded_id, new_objective} = this.state
        const {objectives} = this.props
        return (
            <div>
                <h3>{gettext("Strategic Objectives")}</h3>
                {objectives.map((objective) =>
                    <StrategicObjectiveForm
                        key={objective.id}
                        objective={objective}
                        expanded={objective.id==expanded_id}
                        expandAction={() => this.toggleExpand(objective.id)}
                        deleteAction={() => this.deleteObjectiveAction(objective.id)}
                        saveObjective={(data) => this.updateObjective(objective.id, data)}
                        createObjective={(data) => this.createObjective(data)}
                        errors={this.props.errors}
                        clearErrors={this.props.clearErrors}
                    />
                )}
                <div>
                    <a tabIndex="0" onClick={() => this.addObjective()} className="btn btn-link btn-add">
                        <FontAwesomeIcon icon={'plus-circle'} /> {gettext("Add strategic objective")}
                    </a>
                </div>
            </div>
        )
    }
}
