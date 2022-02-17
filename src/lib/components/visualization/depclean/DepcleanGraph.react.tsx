
import React, { useState, useEffect, useMemo, useRef, CSSProperties, useContext, useLayoutEffect } from 'react';
import { MainInfo } from './private/MainInfo';
import { Row } from 'antd';
import { HorizontalPartitionTree } from './private/HorizontalPartitionTree';
import { v4 as uuidv4 } from 'uuid';
import { DependencyList } from './private/DependencyList';
import { dimension, ResultType } from './private/interfaces/interfaces';
import { Legend } from './private/Legend';
import { AppToolTipStateProvider } from './private/AppToolTipStateContext';
import { getInitialSize, getDebloatValue, getBooleanValue, getColorValue } from './private/Components/homeViz';
import { createProject } from './private/utils/dataRetrieve';
import { artifact, MenuStateI, newState } from './private/interfaces/interfaces';
import { AppStateProvider, useAppState } from './private/AppStateContext';
import { AppMenuStateProvider } from './private/AppMenuStateContext';
import * as PropTypes from "prop-types";
import "./DepcleanGraph.css";
import { WidgetContext } from "../../common";

/** DepClean graph */
export default function DepcleanGraph({ data }: { data: any}) {
    return <AppStateProvider>
        <AppMenuStateProvider>
            <InnerComponent data={data}/>
        </AppMenuStateProvider>
    </AppStateProvider>;
};

const InnerComponent = ({ data } : { data: any }) => {

    const componentRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);

    const appState = "0111111111";
    const { dispatch } = useAppState();

    const { width, height } = useContext(WidgetContext);

    useEffect(() => {

        async function fetchData(fileToLoad: string) {
            await new Promise<void>(resolve => setTimeout(() => {
                const project: artifact = createProject(data);
                upDateMenuState(project);
                setLoading(false);
                resolve();
            }, 1000));
        }

        function upDateMenuState(project: artifact) {
            //transform into an array of numbers
            const menuState = String(appState).split('').map(e => Number(e));
            if (menuState.length !== 10) return;
            try {
                const menState: MenuStateI = [getDebloatValue(menuState[0]), getBooleanValue(menuState[1]), getBooleanValue(menuState[2]), getBooleanValue(menuState[3]), getBooleanValue(menuState[4]), getBooleanValue(menuState[5]), getBooleanValue(menuState[6]), getBooleanValue(menuState[7]), getBooleanValue(menuState[8]), getColorValue(menuState[9])]
                const newStateData: newState = {
                    artifact: project,
                    menuState: menState
                }
                dispatch({ type: "SET_MENU_STATE", payload: newStateData })
            }
            catch (error) {
                console.log("error with the menuState ");
            }
        }

        setLoading(true);
        fetchData("011111111");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appState])

    const divStyle: CSSProperties = {
        height: "100%",
    }

    //DATA FOR TREE
    const dimensions: dimension = useMemo(
        () => getInitialSize(width, height), [width, height]
    )

    return (
        <div className="depcleanGraph">
            {loading === false ?
                <div style={divStyle}>
                    {/*<Row id="MainInfo" className={"margin-buttom-20"} key={uuidv4()} >
                        <MainInfo />
                    </Row>*/}
                        {/*<ButtonGroup componentRef={componentRef} />*/}
                            <AppToolTipStateProvider>
                                <HorizontalPartitionTree dimensions={dimensions} />
                            </AppToolTipStateProvider>
                            <Legend />
                        {/*<DependencyList height={dimensions.boundedHeight - 60} />*/}
                </div> :
                <></>
            }

        </div>
    )
}


DepcleanGraph.defaultProps = {};

DepcleanGraph.propTypes = {
    /**
     * The DepClean output data.
     */
    data: PropTypes.object,
};

