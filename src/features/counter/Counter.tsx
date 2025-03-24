import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { decrement, increment } from './counterSlice.ts';

const Counter = () => {
    const count = useAppSelector((state) => state.counter.count);
    const dispatch = useAppDispatch();

    return (
        <section className="flex flex-col items-center justify-center">
            <p>{count}</p>
            <div className="flex gap-5">
                <button
                    onClick={() => dispatch(increment())}
                    className="cursor-pointer"
                >
                    +
                </button>
                <button
                    onClick={() => dispatch(decrement())}
                    className="cursor-pointer"
                >
                    -
                </button>
            </div>
        </section>
    );
};
export default Counter;
