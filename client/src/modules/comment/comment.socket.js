import { useEffect } from "react";
import socket from "../../services/socket.service";
import { useDispatch } from "react-redux";
import {
  commentAddedRealtime,
  commentUpdatedRealtime,
  commentDeletedRealtime,
} from "./comment.reducer";

export default function useCommentSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("comment:new", (comment) => {
      dispatch(commentAddedRealtime(comment));
    });

    socket.on("comment:update", (comment) => {
      dispatch(commentUpdatedRealtime(comment));
    });

    socket.on("comment:delete", (comment) => {
      dispatch(commentDeletedRealtime(comment));
    });

    return () => {
      socket.off("comment:new");
      socket.off("comment:update");
      socket.off("comment:delete");
    };
  }, [dispatch]);
}
