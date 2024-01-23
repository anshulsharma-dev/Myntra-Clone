import React from "react";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useSelector } from "react-redux";

function Bag() {
  const bagitems = useSelector(store => store.bag);
  const items = useSelector(store => store.items)
  const foundItems = items.filter(item => {
    const itemIndex = bagitems.indexOf(item.id)
    return itemIndex >= 0;
  })

  return (
    <>
      <main>
        <div className="bag-page">
          <div className="bag-items-container">
            {foundItems.map (item => <BagItem item={item} /> )}
          </div>
          <BagSummary />
        </div>
      </main>
    </>
  );
}

export default Bag;
