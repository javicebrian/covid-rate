import React, { useEffect, useRef } from "react";

interface Props {
    data: number[];
    width: number;
    height: number;
}

export default function PieChart({width, height}: Props) {
    const ref: any = useRef();

    useEffect(() => {
    }, []);

    return (
        <svg ref={ref}/>
    );
}