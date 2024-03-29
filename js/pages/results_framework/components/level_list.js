import React from 'react';
import { observer, inject } from "mobx-react"
import { toJS } from 'mobx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import {LevelCardCollapsed, LevelCardExpanded} from "./level_cards";

library.add(faCaretDown, faCaretRight);

@inject('rootStore')
@observer
class LevelList extends React.Component {

    render() {
        let renderList = [];
        if (this.props.renderList == 'initial') {
            renderList = this.props.rootStore.levelStore.sortedLevels
                .filter(level => ['root', null].indexOf(level.parent) != -1)
        }

        else{
            renderList = this.props.renderList.sort((a, b) => a.customsort - b.customsort);
        }

        return renderList.map((elem) => {
            let card = '';
            if (this.props.rootStore.uiStore.activeCard == elem.id) {
                card =
                    <LevelCardExpanded
                        level={elem}
                        levelProps={this.props.rootStore.levelStore.levelProperties[elem.id]}/>
            }
            else {
                card =
                    <LevelCardCollapsed
                        level={elem}
                        levelProps={this.props.rootStore.levelStore.levelProperties[elem.id]}/>
            }

            let children = this.props.rootStore.levelStore.sortedLevels.filter(level => level.parent == elem.id);
            let childLevels = null;
            if (children.length > 0){
                childLevels =  <LevelList
                    rootStore={this.props.rootStore}
                    renderList={children}/>
            }

            return (
                <div key={elem.id} className="leveltier--new">
                    {card}
                    {childLevels}
                </div>
            )
    })}
}

@inject('rootStore')
@observer
export class LevelListPanel  extends React.Component {

    getWarningText = () => {
        return {__html: gettext('<strong class="text-danger">Choose your results framework template carefully!</strong> Once you begin building your framework, it will not be possible to change templates without first deleting all saved levels.') }
    };

    render() {
        if (this.props.rootStore.levelStore.levels.length == 0) {
            return (
                <div className="level-list-panel">
                    <div className="level-list-panel__dingbat">
                        <i className="fas fa-sitemap"></i>
                    </div>
                    <div className="level-list-panel__text text-large"
                        dangerouslySetInnerHTML={this.getWarningText()}/>

                </div>
            )
        }
        else {
            return (
                <div id="level-list" style={{flexGrow: "2"}}><LevelList renderList='initial'/></div>
            )
        }
    }
}

