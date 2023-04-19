import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useContext } from "react";
import NotiContext from "../NotiContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [noti, dispatch] = useContext(NotiContext);

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: () => {
      dispatch({
        type: "SET_NOTI",
        payload: "too short anecdote, must have length 5 or more",
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTI" });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: "SET_NOTI", payload: `anecdote "${content}" created` });
    setTimeout(() => {
      dispatch({ type: "SET_NOTI", payload: "" });
    }, 3000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
