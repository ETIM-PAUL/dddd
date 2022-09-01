export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const getMonthDayYear = (addedDate) => {
  const month = new Date(addedDate).getMonth();
  const getMonthValue = (month) => {
    const date = new Date();
    date.setMonth(month);

    return date.toLocaleString("en-GB", {
      month: "short",
    });
  };
  const date = new Date(addedDate).getDate();
  const year = new Date(addedDate).getFullYear();
  return getMonthValue(month) + " " + date + ", " + year;
};

export const durationToMinsAndSecs = (duration) => {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const spaceArtistes = (artistes, type) => {
  if (artistes?.length > 0) {
    if (type === "search") {
      return artistes.map((artiste) => artiste.name).join(", ");
    }
    return artistes.join(", ");
  } else return artistes;
};

export const mostPopularItemData = {
  image: "",
  name: "",
  artists: "",
};

export const mostPopularItem = (searchResult) => {
  searchResult.tracks.sort((a, b) =>
    a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0
  );
  const mostPopularItem = searchResult.tracks.slice(0, 1);
  mostPopularItemData.image = mostPopularItem[0].album.images[1].url;
  mostPopularItemData.name = mostPopularItem[0].name;
  mostPopularItemData.artists = mostPopularItem[0].artists;
};

export const mostPopularItems = (type) => {
  type.sort((a, b) =>
    a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0
  );

  const itemsToDisplay = type.slice(0, 7);
  return itemsToDisplay;
};
// export const mostPopularArtists = (searchResult) => {
//   searchResult.artists.sort((a, b) =>
//     a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0
//   );

//   const artistsToDisplay = searchResult.artists.slice(0, 4);
//   return artistsToDisplay;
// };
