import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/itemSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

function FetchItems() {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.fetching());

    fetch("http://localhost:8080/items", { signal })
      .then((res) => res.json())
      .then(({ items }) => {
        dispatch(itemActions.addInitialItems(items[0]));
        dispatch(fetchStatusActions.fetchingDone());
        dispatch(fetchStatusActions.markFetchDone());
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return <></>;
}

export default FetchItems;
