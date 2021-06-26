import React,{ useEffect, useContext, useState } from 'react'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { Container, Form, Row, Col, Button, Spinner, Jumbotron, CardDeck, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ResultContext } from './Home'
import './style.css'


const dietLabels = ["balanced", "high-protein" , "high-fiber", "low-fat", "low-carb", "low-sodium"]
const healthLabels = ["vegan", "vegetarian", "paleo", "dairy-free", "gluten-free", "wheat-free", "fat-free", "low-sugar", "egg-free", "peanut-free", "tree-nut-free", "soy-free", "fish-free", "shellfish-free"]
const mealType = ["breakfast",	"lunch", "dinner", "snack", "teatime"]
const cuisineType = ["american", "asian", "british", "caribbean", "central-europe", "chinese", "eastern-europe", "french", "indian", "italian", "japanese", "kosher", "mediterranean", "mexican", "middle-eastern", "nordic", "south-american", "south-east-asian"]
const dishType = ["alcohol-cocktail", "biscuit-and-cookies", "bread", "cereals", "condiments-and-sauces", "drinks", "desserts", "egg", "main-course", "omelet", "pancake", "preps", "preserve", "salad", "sandwiches", "soup", "starter"] 
	

export default function Main() {
	const { recipeResults, setRecipeResults, next, setNext } = useContext(ResultContext)
	const [pquery, setPquery] = useState("")
	const [query, setQuery] = useState()
	const [diet, setDiet] = useState([])
	const [health, setHealth] = useState([])
	const [meal, setMeal] = useState([])
	const [cuisine, setCuisine] = useState([])
	const [dish, setDish] = useState([])
	const [disabled, setDisabled] = useState(false)
	const [isLoaded, setIsLoaded] = useState(true)
	const [error, setError] = useState("")
	const pseudo = 0

	function handleDietChange(diet){
		setDiet([...diet])
	}
	function handleHealthChange(health){
		setHealth([...health])
	}
	function handleCuisineChange(cuisine){
		setCuisine([...cuisine])
	}
	function handleMealChange(meal){
		setMeal([...meal])
	}
	function handleDishChange(dish){
		setDish([...dish])
	}
	function handleSubmit(e){
		e.preventDefault()
		setIsLoaded(true)
		setQuery(pquery)
	}
	function handleClick(){
		setIsLoaded(true)
    setNext(next+10)
  }

  useEffect(()=> {
		axios.get(`https://api.edamam.com/search`, {
			params:{
				q: query,
				app_id: "5e32d2ff",
				app_key: "8da623b31818fc5acf7df8cbe1ffa6ce",
				from: next,
				imagineSize: "LARGE"
			}
		})
		.then(response => {
			console.log(response.data)
			setDisabled(!response.data.more)
			setRecipeResults(response.data.hits)
			setIsLoaded(false)
		})
		.catch(err => {
			console.log(err)
			setError(err)
		})
}, [query, next, setRecipeResults])

if(error){
	return(   
		<div>Error</div>
	)
}else if(isLoaded){
	return (
		<div style={{display: "grid", placeItems: "center"}}>
			<Spinner animation="grow" />
		</div>
	)
}else{
	return(
		<div>{!recipeResults ? 
			(<Container className="pt-5">
				{pseudo ? (
					meal,
					diet,
					health,
					cuisine,
					dish
				): ""}
				<Jumbotron>
					<h1 style={{textAlign: "center"}}>Recipe Search</h1>
					<div className="mt-5">
						<em>
							The Recipe Search requires a recipe name and returns a set of recipes with their source and some basic info about them
						</em>
					</div>
				</Jumbotron>
				<Form onSubmit={handleSubmit}>
					<Container style={{width: "50%"}}>
						<Row>
							<Col>
								<Form.Group>
									<Form.Control 
										type="text"
										placeholder="Just enter a recipe and you're good to go!!"
										value={pquery}
										onChange={(e) => setPquery(e.target.value)}
										required
									/>
								</Form.Group>
								<div className="d-flex justify-content-center" ><Button type="submit" variant="outline-secondary">Submit</Button></div>
							</Col>
						</Row>
					</Container>
					<DropdownMultiselect
						options={dietLabels}
						name="DietLabels"
						handleOnChange={handleDietChange}
						placeholder="Diet labels"
					/>
					<DropdownMultiselect
						options={healthLabels}
						name="HealthLabels"
						handleOnChange={handleHealthChange}
						placeholder="Health labels"
					/>
					<DropdownMultiselect
						options={cuisineType}
						name="CuisineType"
						handleOnChange={handleCuisineChange}
						placeholder="Cuisine Type"
					/>
					<DropdownMultiselect
						options={dishType}
						name="DishType"
						handleOnChange={handleDishChange}
						placeholder="Dish type"
					/>
					<DropdownMultiselect
						options={mealType}
						name="MealType"
						handleOnChange={handleMealChange}
						placeholder="Meal type"
					/>
				</Form>
			</Container>
			) : (
				<Container>
				<CardDeck className="row" >
				{recipeResults.length>0 && recipeResults.map((recipeResult, index) => (
					<Container className="col-xs-12 col-sm-6 col-md-4" key={index}>
						<Card className="hover-style" style={{margin: "5% 0%"}}>
							<div className="view overlay">
								<Card.Img className="card-img-top" src={recipeResult.recipe.image} alt="Card image cap" />
							</div>
							<Card.Body style={{margin: "0% 0% 0% 3%", padding: "6% 0%"}}>
								<Card.Title>
									<Link to={`/recipe/${index}`}>
										<Card.Title>{recipeResult.recipe.label}</Card.Title>
									</Link>
								</Card.Title>
								<Card.Text>
									<div className="text-muted" style={{textTransform: "capitalize"}}>
										{`${recipeResult.recipe.cuisineType} ${recipeResult.recipe.dishType}`}
									</div>
								</Card.Text>
							</Card.Body>
							<Card.Footer className="blockquote-footer">
								Source <cite title="Source Title"><a href={recipeResult.recipe.url}>{recipeResult.recipe.source}</a></cite>
							</Card.Footer>
						</Card>
					</Container>
				))}
				</CardDeck>
				<div className="d-flex justify-content-between pb-3" >
					<a class="btn btn-outline-secondary" href="/" role="button">Back to Search!!</a>
					<Button variant="outline-secondary" disabled={disabled} onClick={handleClick} type="button">Next</Button>
				</div>
			</Container>
		)}
		</div>
	)	
}}

			