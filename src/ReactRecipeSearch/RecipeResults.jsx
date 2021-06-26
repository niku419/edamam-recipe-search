import React, { useContext } from 'react'
import { Container, Card, Button, CardDeck } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ResultContext } from './Home'

export default function RecipeResults() {
  const {recipeResults, setNext, next} = useContext(ResultContext)
  function handleClick(){
    setNext(next+10)
  }
  return (
    <Container>
      <CardDeck className="row" >
      {recipeResults.length>0 && recipeResults.map((recipeResult, index) => (
        <Container className="col-xs-12 col-sm-6 col-md-4" key={index}>
          <Card style={{margin: "5% 0%"}}>
            <div className="view overlay">
              <Card.Img className="card-img-top" src={recipeResult.recipe.image} alt="Card image cap" />
              <a href="#!">
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>
            <Card.Body style={{margin: "0% 0% 0% 3%", padding: "6% 0%"}}>
              <Card.Title>
                <Link to={`/recipe/${index}`}>
                  <Card.Title>{recipeResult.recipe.label}</Card.Title>
                </Link>
              </Card.Title>
              <Card.Text>
                <>{recipeResult.recipe.cuisineType}</>
                <>{recipeResult.recipe.dishType}</>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="blockquote-footer">
              Source <cite title="Source Title"><a href={recipeResult.recipe.url}>{recipeResult.recipe.source}</a></cite>
            </Card.Footer>
          </Card>
        </Container>
      ))}
      </CardDeck>
      <Button className="d-flex flex-row-reverse" onClick={handleClick} type="button">Next</Button>
    </Container>
  )
}