import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function Search() {
  const [result, setResult] = useState(null);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${params.query}`
      );
      setResult(response.data.meals);
    };
    getData();
  }, [params]);

  const handleClick = (id) => {
    history.push(`/recipe/${id}`);
  };

  const renderMeals = () => {
    return result.map((recipe) => {
      return (
        <div
          key={recipe.idMeal}
          onClick={() => {
            handleClick(recipe.idMeal);
          }}
        >
          <h1>{recipe.strMeal}</h1>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
      );
    });
  };

  if (!result) {
    return <div>Loading</div>;
  }

  return <div>{renderMeals()}</div>;
}

export default Search;
