import * as React from 'react';

interface CounterBtnProps {
    children: React.ReactNode;
    onClick: () => void;
}

const CounterButton = (props: CounterBtnProps) => {
    return (
        <button
            onClick={props.onClick} className="text-[2rem] md:text-6xl my-2 ml-2 min-w-8 p-2"
        >
            {props.children}
        </button>
    );
};
export default CounterButton;
