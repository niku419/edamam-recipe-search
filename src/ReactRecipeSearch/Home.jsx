import React,{ useState} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import Main from './Main'
import RecipeResults from './RecipeResults'
import Recipe from './Recipe'

export const ResultContext = React.createContext(null)

export default function Home() {
  const [recipeResults, setRecipeResults] = useState({})
  const [next, setNext] = useState(0)
  return (
    <Router>
      <ResultContext.Provider value={{recipeResults, setRecipeResults, next, setNext}}>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/recipes' component={RecipeResults}/>
          <Route exact path='/recipe/:index' component={Recipe}/>
        </Switch>
      </ResultContext.Provider>
    </Router>
  )
}
