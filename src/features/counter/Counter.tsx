import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

const Counter = () => {
    const count = useAppSelector((state) => state.counter.count);
    const dispatch = useAppDispatch();

    return (
        <section>
            <p>{count}</p>
            <button>+</button>
        </section>
    );
};
export default Counter;
