import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => (
  <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const anecdotesSortedByVotes = anecdotes
    .slice()
    .sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const handleClick = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(notificationChange(`you voted for ${anecdote.content}`));
    setTimeout(() => {
      dispatch(notificationChange(``));
    }, 3000);
  };

  return (
    <div>
      {anecdotesSortedByVotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            handleClick(anecdote);
          }}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
