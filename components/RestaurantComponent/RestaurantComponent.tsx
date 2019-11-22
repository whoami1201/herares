import React from "react"
import { COLORS } from "../../constants"
import { Restaurant } from "../../interfaces"
import HoursComponent from "../HoursComponent/HoursComponent"
import AddressComponent from "../AddressComponent/AddressComponent"

type Props = {
  restaurant: Restaurant
}

const RestaurantComponent: React.FC<Props> = ({ restaurant }) => (
  <div className="wrapper">
    <div className="titleWrapper">
      <h1>{restaurant.name.en || restaurant.name.fi}</h1>
      {restaurant.info_url && (
        <p className="website">
          <a href={restaurant.info_url} target="_blank">
            {restaurant.info_url}
          </a>
        </p>
      )}
    </div>
    <div className="description">{restaurant.description.body}</div>
    <HoursComponent openingHours={restaurant.opening_hours} />
    <AddressComponent location={restaurant.location} />
    <style jsx>{`
      .wrapper {
        width: 50%;
        margin: auto;
        border: 4px solid ${COLORS.PRIMARY};
        padding: 40px 60px;
        margin: 40px 0;
        max-width: 900px;
        overflow: hidden;
      }
      .titleWrapper {
      }
      .description {
        color: ${COLORS.SECONDARY};
        line-height: 1.5em;
      }

      @media (max-width: 768px) {
        .wrapper {
          width: 95%;
          padding: 30px;
        }
      }
    `}</style>
  </div>
)

export default RestaurantComponent
