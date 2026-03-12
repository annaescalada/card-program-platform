import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store"
import { decrement, increment, incrementByAmount } from "../store/counter/counterSlice"

const Counter: React.FC = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return <>
        <h2>Count: {count}</h2>
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(5))}>
                Increment by 5
            </button>
        </div>
    </>
}

export default Counter