export type Hour = {
  weekday_id: number
  opens: string | null
  closes: string | null
  open24h: boolean
}

export type OpeningHours = {
  hours: Array<Hour>
  openinghours_exception: string
}

export type Location = {
  address: {
    locality: string
    postal_code: string
    street_address: string
  }
  lat: number
  lon: number
}

type Tag = {
  id: string
  name: string
}

export type Restaurant = {
  description: {
    body: string
    images?: string
    intro?: string
  }
  id: string
  info_url: string
  location: Location
  modified_at: string
  name: {
    en: string | null
    fi: string | null
    sv: string | null
    zh: string | null
  }
  opening_hours: OpeningHours
  source_type: {
    id: number
    name: string
  }
  tags: Array<Tag>
}
