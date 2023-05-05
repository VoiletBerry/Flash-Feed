import React, { useEffect, useState } from "react";
import { client } from "./../client";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";
import { useParams } from "react-router";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        console.log(data);
        setCards(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setCards(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are addding new ideas to your feed" />;

  return <div>{cards && <MasonaryLayout cards={cards} />}</div>;
};

export default Feed;
