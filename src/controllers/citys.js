
import { CityModel } from '../models/mysql/citys.js'

import {validateCity, validatePartialCity } from '../schemas/citys.js'

export class CityController {
  static async getAll (req, res) {
    const { genre } = req.query
    const citys = await CityModel.getAll({ genre })
    res.json(citys)
  }

/////////////////////////
static async create (req, res) {
    const result = validateCity(req.body)
    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await CityModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { ciudad } = req.query
    console.log("Que ciudad ve " , ciudad);
    const result = await CityModel.delete({ ciudad })
    if (result === false) {
      return res.status(404).json({ message: 'City do not found' })
    }

    return res.json({ message: 'City deleted' })
  }

/*


*/



}