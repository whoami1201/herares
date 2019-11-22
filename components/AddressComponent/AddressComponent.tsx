import React from "react"
import { COLORS } from "../../constants"
import { Location } from "../../interfaces"

type Props = {
  location: Location
}

const AddressComponent: React.FC<Props> = ({ location: { address } }) => {
  const fullAddress = `${address.street_address}, ${address.postal_code} ${address.locality}`
  return (
    <div className="wrapper">
      <h3>ADDRESS</h3>
      <div className="location">
        <a href={`http://maps.google.com/?q=${fullAddress} `} target="_blank">
          {fullAddress}
        </a>
      </div>
      <style jsx>{`
        .wrapper {
          margin-top: 30px;
          border-top: 2px solid ${COLORS.SECONDARY};
          display: flex;
          flex-direction: row;
        }
        h3 {
          margin-right: 1em;
          width: 160px;
        }
        .location {
          margin-top: 1.2em;
        }

        @media (max-width: 768px) {
          .wrapper {
            flex-direction: column;
          }
          .location {
            margin-top: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default AddressComponent
