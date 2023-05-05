export const userQuery = (userId) => {
  const query = `*[ _type == "user" && _id == '${userId}']`;
  return query;
};

export const searchQuery = (searhCategory) => {
  const query = `*[_type == "card" && title match '${searhCategory}*' || category match '${searhCategory}*' || about match '${searhCategory}*' ]{
    image {
      asset -> {
        url
      },
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};

export const CardDetailQuery = (CardId) => {
  const query = `*[_type == "card" && _id == '${CardId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const RelatedCards = (card) => {
  const query = `*[_type == "card" && category == '${card.category}' && _id != '${card._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const feedQuery = `*[ _type == "card"] | order(_createdAt desc) {
      image {
      asset -> {
        url
      },
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
}`;

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'card' && userID == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'card' && '${userId}' in save[].userID ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

