import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
    decrement,
    increment,
    incrementByAmount,
    reset,
} from './counterSlice.ts';
import { CounterButton } from '../../components/index.ts';
import { useState } from 'react';

const Counter = () => {
    const count = useAppSelector((state) => state.counter.count);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState<number>(0);

    const addValue = incrementAmount || 0;

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-[5rem]">
            <p>{count}</p>
            <div className="flex gap-5">
                <CounterButton onClick={() => dispatch(increment())}>
                    +
                </CounterButton>
                <CounterButton onClick={() => dispatch(decrement())}>
                    -
                </CounterButton>
            </div>

            <input
                type="text"
                className="text-center min-w-1/2 max-w-10"
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(Number(e.target.value))}
            />

            <div className="flex gap-5">
                <CounterButton
                    onClick={() => dispatch(incrementByAmount(addValue))}
                >
                    Add Amount
                </CounterButton>
                <CounterButton onClick={resetAll}>Reset</CounterButton>
            </div>
        </section>
    );
};
export default Counter;
