import React, { useEffect, useState } from "react";
import { fetchCategoryItem } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import CardComponent from "./cardComponent";

const CategoryItems = () => {
  const [items, setItems] = useState([]);
  const { state, dispatch } = useSpotify();
  const { token, selectedCategory } = state;

  useEffect(() => {
    if (selectedCategory !== null) {
      fetchCategoryItem(token, selectedCategory.id).then((response) => {
        setItems(response);
      });
    }
  }, [selectedCategory, token]);
  return (
    <>
      {selectedCategory && items.length > 0 && (
        <div className=" font-sans font-black pb-8">
          <span className="text-white text-[90px]">
            {selectedCategory.name}
          </span>

          <div className="flex flex-wrap gap-6 relative justify-center">
            {items.map(({ id, name, images, description, uri }) => {
              return (
                <CardComponent
                  key={id}
                  id={id}
                  name={name}
                  type="category"
                  image={images}
                  uri={uri}
                  desc={description}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryItems;
