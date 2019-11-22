import React from "react"
import { COLORS } from "../../constants"
import { OpeningHours } from "../../interfaces"
import { getIsOpen, formatHours, WEEK_DAYS } from "./helpers"

type Props = {
  openingHours: OpeningHours
}

const HoursComponent: React.FC<Props> = ({ openingHours }) => {
  return (
    <div className="hoursWrapper">
      <div>
        <h3>OPENING HOURS</h3>
        {getIsOpen(openingHours) ? (
          <p className="status open">Open now!</p>
        ) : (
          <p className="status close">
            {openingHours.openinghours_exception === ""
              ? "Closed now"
              : "Check exception hours"}
          </p>
        )}
      </div>
      <div className="days">
        {openingHours && openingHours.hours ? (
          openingHours.hours.map(hour => {
            return (
              <div className="daysRow" key={hour.weekday_id}>
                <span className="day">{WEEK_DAYS[hour.weekday_id - 1]}</span>
                <span>{formatHours(hour)}</span>
              </div>
            )
          })
        ) : (
          <div className="daysRow">
            No hours information for this restaurant
          </div>
        )}
        <div className="daysRow special">
          {openingHours.openinghours_exception}
        </div>
      </div>
      <style jsx>{`
        .hoursWrapper {
          margin-top: 30px;
          border-top: 2px solid ${COLORS.SECONDARY};
          display: flex;
          flex-direction: row;
        }
        h3 {
          margin-right: 1em;
          min-width: 160px;
        }
        .days {
          display: flex;
          flex-direction: column;
          margin-top: 1em;
        }
        .daysRow {
          display: flex;
          flex-direction: row;
          line-height: 1.5em;
        }
        .day {
          width: 40px;
        }
        .special {
          font-style: italic;
        }
        .status {
          font-weight: bold;
        }
        .open {
          color: #00bf00;
        }
        .close {
          color: #bd0000;
        }
        @media (max-width: 768px) {
          .hoursWrapper {
            flex-direction: column;
          }
          .days {
            margin-top: 0.5em;
          }
        }
      `}</style>
    </div>
  )
}

export default HoursComponent
