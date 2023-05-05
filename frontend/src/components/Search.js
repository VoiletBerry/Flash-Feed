import React, { useContext, useEffect, useState } from "react";

import MasonaryLayout from "./MasonaryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";
import SearchContext from "../Context/SearchContext";

const Search = () => {
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(false);

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  useEffect(() => {
    if (searchTerm !== "" && searchTerm !== null) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setCards(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setCards(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching Posts" />}
      {cards?.length !== 0 && <MasonaryLayout cards={cards} />}
      {cards?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Posts Found!</div>
      )}
    </div>
  );
};

export default Search;
