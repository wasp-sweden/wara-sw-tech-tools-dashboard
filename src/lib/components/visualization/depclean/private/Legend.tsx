import React from 'react';
import { useAppState } from "./AppStateContext";
import { dependencyPallete, ratioColor, getCGenerator } from "./utils/treeAccess";
import { LegendColor } from "./LegendColor";
import { LegendGroup } from './LegendGroup';
import { filterOmmitedandTest, filterDeleted } from './utils/horizontalTree';
import { getMainGroupIds, getUniqueArray } from './utils/stringManager';
import { providersKey } from './interfaces/interfaces';

export const Legend = () => {
    //get the main state
    const { state } = useAppState();
    const { colorSelected, filtered } = state;

    const nodes = colorSelected === "GROUP_ID" ?
        filtered.descendants()
            .filter(filterOmmitedandTest)
            .filter(filterDeleted)
        : null;

    const providers: providersKey[] = colorSelected === "GROUP_ID" ? getMainGroupIds(getUniqueArray(nodes)) : []

    return <div id={"legend"} className={"flex legend-right"}>
        {colorSelected === "DEPENDENCY_TYPE" ?
            <LegendColor pallete={dependencyPallete} tittle="Dependencies" /> :
            colorSelected === "USAGE_RATIO" ?
                <LegendColor pallete={ratioColor} tittle="Types" /> :
                colorSelected === "GROUP_ID" ?
                    <LegendGroup
                        colorPallete={getCGenerator(colorSelected, providers)}
                        rectSize={10}
                        groupIds={providers}
                    /> :
                    <></>
        }
    </div>
}