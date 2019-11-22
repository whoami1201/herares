import moment, { Moment } from "moment"
import { OpeningHours, Hour } from "../../interfaces"

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export const HOURS = {
  CLOSED: "Closed",
  OPEN_24H: "Open 24 hours",
}

export const getMomentHour = (time: string): Moment => moment(time, "HH:mm:ss")

export const formatHours = (hour: Hour): string => {
  if (!hour.opens) {
    return HOURS.CLOSED
  } else if (hour.open24h) {
    return HOURS.OPEN_24H
  } else {
    const open = getMomentHour(hour.opens).format("HH.mm")
    const close = getMomentHour(hour.closes).format("HH.mm")
    return `${open} - ${close}`
  }
}

export const getIsOpen = (openingHours: OpeningHours): boolean => {
  if (openingHours && openingHours.hours) {
    const hour = openingHours.hours.find(
      hour => hour.weekday_id === moment().isoWeekday()
    )

    if (!hour || !hour.opens) {
      return false
    }

    const openTime = getMomentHour(hour.opens)
    const closeTime = getMomentHour(hour.closes)

    if (openTime.isBefore(closeTime)) {
      return moment().isBetween(openTime, closeTime)
    } else {
      return !moment().isBetween(closeTime, openTime)
    }
  }
  return false
}
