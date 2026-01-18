import { ENDPOINT } from "@/constant/http"
import axios from "axios"
import { GetQuoteParams, Quote } from "./types"

export const getQoute = async (params?: GetQuoteParams): Promise<Quote[] | undefined> => {
  try {
    
    const { data } = await axios.get(ENDPOINT.QOUTES.qoutes, {params: {...params, categories: params?.categories?.join(","), exclude_categories: params?.exclude_categories?.join(","),}})
    return data.data
  } catch (error) {
    throw error
  }
}