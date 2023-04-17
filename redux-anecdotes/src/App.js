import { useSelector, useDispatch } from "react-redux";
import { vote, newAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const anecdotesSortedByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(newAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesSortedByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
