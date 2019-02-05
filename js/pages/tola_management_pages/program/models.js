import { observable, computed, action, runInAction } from "mobx";


export class ProgramStore {

    //filter options
    @observable countries_listing = []
    @observable countries = []
    @observable organizations = {}
    @observable users = []
    @observable sectors = []

    @observable filters = {
        countries: [],
        organizations: [],
        sectors: [],
        programStatus: null,
        programs: [],
    }

    @observable allPrograms = []
    @observable programs = []
    @observable program_count = 0
    @observable new_program = null
    @observable fetching_main_listing = false
    @observable current_page = 0
    @observable total_pages = null
    @observable bulk_targets = new Map()
    @observable bulk_targets_all = false

    @observable editing_target = null
    @observable editing_errors = null
    @observable fetching_editing_target = false
    @observable editing_target_data = {
    }
    @observable saving = false;

    @observable bulk_targets = new Map()
    @observable applying_bulk_updates = false
    @observable bulk_targets_all = false

    constructor(
        api,
        initialData,
    ) {
        this
        this.api = api
        Object.assign(this, initialData)
        this.fetchPrograms()
    }

    marshalFilters(filters) {
        return Object.entries(filters).reduce((xs, [filterKey, filterValue]) => {
            if (Array.isArray(filterValue)) {
                xs[filterKey] = filterValue.map(x => x.value)
            } else if (filterValue) {
                xs[filterKey] = filterValue.value
            }
            return xs
        }, {})
    }

    @action
    fetchPrograms() {
        this.fetching_main_listing = true
        this.api.fetchPrograms(this.current_page + 1, this.marshalFilters(this.filters)).then(results => {
            runInAction(() => {
                this.fetching_main_listing = false
                this.programs = results.results
                this.program_count = results.total_results
                this.total_pages = results.total_pages
                this.next_page =results.next_page
                this.previous_page = results.previous_page
            })
        })

    }

    @action
    changePage(page) {
        if (page.selected == this.current_page) {
            return
        }
        this.current_page = page.selected
        this.bulk_targets = new Map()
        this.bulk_targets_all = false;
        this.fetchPrograms()
    }

    @action
    changeFilter(filterKey, value) {
        this.filters = Object.assign(this.filters, {[filterKey]: value})
    }

    @action
    clearFilters() {
        let clearFilters = {
            countries: [],
            organizations: [],
            sectors: [],
            programStatus: null,
            programs: [],
        }
        this.filters = Object.assign(this.filters, clearFilters);
    }

    @action
    toggleEditingTarget(id) {
        if(this.editing_target == 'new') {
            this.programs.shift()
        }

        if(this.editing_target == id) {
            this.editing_target = false
        } else {
            this.editing_target = id
            this.fetching_editing_target = true
            // fetch data for the program editor
            /*
            this.fetching_editing_target = true
            this.fetchProgramData(id)
            */
        }
    }

    updateLocalPrograms(updated) {
        this.programs = this.programs.reduce((acc, current) => {
            if (current.id == updated.id) {
                acc.push(updated)
            } else {
                acc.push(current)
            }
            return acc
        }, [])
    }

    onSaveSuccessHandler() {
        PNotify.success({text: "Successfully Saved", delay: 5000})
    }

    onSaveErrorHandler() {
        PNotify.error({text: "Saving Failed", delay: 5000})
    }

    @action
    createProgram() {
        if(this.editing_target == 'new') {
            this.programs.shift()
        }

        let new_program_data = {
            id: "new",
            name: "",
            gaitid: "",
            fundcode: "",
            funding_status: "",
            description: "",
            country: [],
            sector: [],
        }
        this.programs.unshift(new_program_data)
        this.editing_target = 'new'
    }

    @action
    saveNewProgram(program_data) {
        program_data.id = null
        this.saving = true
        this.api.createProgram(program_data).then(response => {
            runInAction(()=> {
                this.saving = false
                this.editing_target = false
                this.programs.shift()
                this.programs.unshift(response.data)
            })
        }).catch(error => {
            runInAction(()=> {
                this.saving = false
                this.editing_errors = error.response.data
            })
        })
    }

    @action updateProgram(id, program_data) {
        this.saving = true
        this.api.updateProgram(id, program_data).then(response => {
            runInAction(() => {
                this.saving = false
                this.editing_target = false
                this.updateLocalPrograms(response.data)
                this.onSaveSuccessHandler()
            })
        }).catch((errors) => {
            runInAction(() => {
                this.saving = false
                this.editing_errors = errors.response.data
            })
        })
    }

    @action
    toggleBulkTarget(target_id) {
        this.bulk_targets.set(target_id, !this.bulk_targets.get(target_id))
    }

    @action
    toggleBulkTargetsAll() {
        this.bulk_targets_all = !this.bulk_targets_all
        this.bulk_targets = new Map(this.programs.map(program => [program.id, this.bulk_targets_all]))
    }

    @action
    bulkUpdateProgramStatus(new_status) {
        let ids = Array.from(this.bulk_targets.entries()).filter(([id, targeted]) => targeted).map(([id, targeted]) => id)
        if (ids.length && new_status) {
            this.api.updateProgramFundingStatusBulk(ids, new_status)
        }
    }

}
