import React, {useContext} from 'react'
import {Container, Card, Badge} from 'react-bootstrap'
import { ResultContext } from './Home'
import {useParams} from 'react-router-dom'

export default function Recipe() {
  const {recipeResults} = useContext(ResultContext)
  const {index} = useParams()
  
  return (
    <>
      <h1 className="heading mt-4"><Badge pill variant="dark">{(recipeResults[index].recipe.label)}</Badge></h1>
      <Container className="row">
        <Container className="col pt-5 d-flex align-items-center justify-content-center">
          <Card className="mb-3 hover-style" style={{maxWidth: "540px", width: "18rem", color: "#0f1f5c"}} >
            <Card.Img className="img-fluid" style={{maxWidth: "100%", height: "auto"}} src={recipeResults[index].recipe.image} alt="..."/>
            <Card.Title className="blockquote pt-2" style={{textAlign: "center"}}>
            <footer className="blockquote-footer">
              <small className="text">
                <cite title="Source Title">{`${recipeResults[index].recipe.cuisineType[0]} ${recipeResults[index].recipe.mealType[0]}`}</cite>
              </small>
            </footer>
          </Card.Title>
          </Card>
        </Container>
        <Container className="col pt-5 d-flex align-items-center justify-content-center">
          <Card.Body>
            <ul>
              <li><strong>Number of Serves</strong>: {recipeResults[index].recipe.yield}</li>
              <li><strong>Total Weight</strong>: {recipeResults[index].recipe.totalWeight}</li>
              <li><strong>Total Calories</strong>: {recipeResults[index].recipe.calories}</li>
            </ul>
            <ul>
              {recipeResults[index].recipe.ingredients.map((ingredient, index) =>(
                <li key={index}>
                  <strong>{ingredient.text}</strong>: {ingredient.weight}g
                </li>
              ))}
            </ul>
          </Card.Body>
        </Container>
      </Container>
      <div className="d-flex justify-content-between py-3 pl-5" >
        <a class="btn primary" href="/" role="button">Back to Search!!</a>
      </div>
    </>
  )
}
