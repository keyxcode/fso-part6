import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useContext } from "react";
import NotiContext from "./NotiContext";

const App = () => {
  const queryClient = useQueryClient();
  const [noti, dispatch] = useContext(NotiContext);

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    dispatch({
      type: "SET_NOTI",
      payload: `anecdote "${anecdote.content}" voted`,
    });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTI" });
    }, 3000);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
