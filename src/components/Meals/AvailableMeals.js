import { useCallback, useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('json/meals.json');
      console.log(response)
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const transformedMeals = data.results.map((meal) => {
        return {
          id: meal.id,
          name: meal.product_name,
          description: meal.desc,
          price: meal.price,
        };
      });
      setMeals(transformedMeals);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  let content = <p>Found no meals.</p>;
  if (meals.length > 0) {
    content = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));
  } else if (error) {
    content = <p>{error}</p>;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
