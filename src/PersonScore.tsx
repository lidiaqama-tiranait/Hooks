import { useEffect, useReducer } from 'react';
import { getPerson } from './getPerson';

export function PersonScore() {
  type State = {
    name: string | undefined;
    score: number;
    loading: boolean;
  };
  type Action =
    | {
        type: 'initialization';
        name: string;
      }
    | {
        type: 'increment';
      }
    | {
        type: 'decrement';
      }
    | {
        type: 'reset';
      };
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'initialization':
        return { name: action.name, score: 0, loading: false };
      case 'increment':
        return { ...state, score: state.score + 1 };
      case 'decrement':
        return { ...state, score: state.score - 1 };
      case 'reset':
        return { ...state, score: 0 };
    }
  }
  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });
  useEffect(() => {
    getPerson().then((person) => {
      dispatch({ type: 'initialization', name: person.name });
    });
  }, []);
  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <button onClick={() => dispatch({ type: 'increment' })}>Add</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Subtract</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
