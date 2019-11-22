import React, { useState, useEffect, useCallback } from "react"
import Head from "next/head"
import { Restaurant } from "../interfaces"
import RestaurantComponent from "../components/RestaurantComponent/RestaurantComponent"
import { COLORS } from "../constants"

const getRandomFromArray = (array: Array<any>): any =>
  array[Math.floor(Math.random() * array.length)]

const FINNISH_FOODS = [
  "salmiakki",
  "leipäjuusto",
  "piirakka",
  "korvapuusti",
  "makkara",
  "Karhu",
  "Karjala",
  "lonkero",
]

const Home = () => {
  const [restaurantList, setRestaurantList] = useState<Array<Restaurant>>([])
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    fetch(
      `https://cors-anywhere.herokuapp.com/http://open-api.myhelsinki.fi/v1/places/?tags_search=matko1%3A10&language_filter=en`
    )
      .then(res => res.json())
      .then(response => {
        setRestaurantList(response.data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (restaurantList.length > 0) {
      setRestaurant(getRandomFromArray(restaurantList))
    }
  }, [restaurantList])

  return (
    <>
      <Head>
        <title>HRRG!</title>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <h1>Helsinki Random Restaurant Generator</h1>
        <button
          onClick={() => {
            if (restaurantList.length > 0) {
              setRestaurant(getRandomFromArray(restaurantList))
            } else {
              setIsLoading(true)
              fetchData()
            }
          }}
        >
          I can't decide where to eat
        </button>
        {restaurant && <RestaurantComponent restaurant={restaurant} />}
        {isLoading && (
          <p>{`Hold my ${getRandomFromArray(FINNISH_FOODS)}...`}</p>
        )}
        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
          }
          button {
            padding: 20px;
            border: 3px solid ${COLORS.PRIMARY};
            font-size: 1.2em;
          }
          button:hover {
            background-color: #fff03a;
            cursor: pointer;
          }
          p {
            color: ${COLORS.SECONDARY};
          }
          @media (max-width: 768px) {
            .container {
              padding: 20px;
            }
            h1 {
              font-size: 1.5em;
              text-align: center;
            }
          }
        `}</style>
        <style jsx global>{`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: "Lato", sans-serif;
            color: ${COLORS.PRIMARY};
          }
          a {
            color: black;
          }
          a:hover {
            opacity: 0.6;
          }
          button:focus {
            outline: 0;
          }
        `}</style>
      </div>
    </>
  )
}

export default Home
