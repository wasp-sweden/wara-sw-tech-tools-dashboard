
import React, { useState, useEffect, useMemo, useRef, CSSProperties, useContext } from 'react';
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

// TODO: this needs to live somewhere else
export const SizeContext = React.createContext({ width: 0, height: 0 });

export const DepcleanGraph = ({ data }: { data: any}) => {

    //const ref = useRef<HTMLDivElement>(null);

    //const [size, setSize] = useState<{ width: number, height: number } | null>(null);

    //useEffect(() => {
    //    if (ref.current && size === null) {
    //        setSize({ width: ref.current.clientWidth, height: ref.current.clientHeight });
    //    }
    //}, [ref]);

    return <AppStateProvider>
        <AppMenuStateProvider>
            <InnerComponent data={data}/>
        </AppMenuStateProvider>
    </AppStateProvider>;
};

const InnerComponent = ({ data } : { data: any }) => {

    const componentRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);

    const size = useContext(SizeContext);

    //modify size on resize
    //useEffect(() => {
    //    function handleResize() {
    //        if (size.width !== window.innerWidth && size.height !== window.innerHeight) setSize({
    //            width: window.innerWidth,
    //            height: window.innerHeight
    //        })
    //    }
    //    window.addEventListener('resize', handleResize)
    //})

    const appState = "0111111111";
    const { dispatch } = useAppState();

    useEffect(() => {

        async function fetchData(fileToLoad: string) {
            await new Promise<void>(resolve => setTimeout(() => {
                const project: artifact = createProject(data);
                upDateMenuState(project);
                setLoading(false);
                console.log("loaded test project");
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
        border: "2px dotted black",
    }


    //DATA FOR TREE
    const dimensions: dimension = useMemo(
        () => getInitialSize(size.width, size.height), [size.width, size.height]
    )
    return (
        <div ref={componentRef} className="depcleanGraph">
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

