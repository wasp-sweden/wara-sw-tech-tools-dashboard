import React from 'react';
import { PartitionArea } from './vizUtils/PartitionArea'
import { yDisplacedAccessor } from './accessors/partitionNodeAccessor'
import { xAccessor, yAccessor } from './accessors/squareAccessors';
import { v4 as uuidv4 } from 'uuid';

interface partitionAreaNodeProps {
    data: any[],
    colorAccessor: any,
}

export const PartitionAreaNode = ({
    data,
    colorAccessor
}: React.PropsWithChildren<partitionAreaNodeProps>) => {

    return <g >
        {data.map((node: any) => {
            return <g transform={"translate(" + yAccessor(node) + "," + xAccessor(node) + ")"} key={uuidv4()}>
                <PartitionArea
                    types={node.data.allTypes}
                    usedTypes={node.data.usedTypes}
                    height={node.h}
                    width={node.w}
                    yDisplacement={yDisplacedAccessor(node)}
                />
            </g>
        })}
    </g>
}