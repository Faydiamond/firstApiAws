import mysql from "mysql2/promise"
import dotenv from 'dotenv'
dotenv.config()

console.log("queee ",process.env.DB_HOST);

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB

}

const connection = await mysql.createConnection(config)

export class CityModel {
    static async getAll ({ genre }) {
      let citys = `select  * from citys`
      if (citys){
          const [result] = await connection.query(citys)  //desestructuro pq viene dos
          if (result.length === 0 ) return []
          return result;
      }
  
      const [result] = await connection.query(citys)  //desestructuro pq viene dos
      return result;
    }

    static async create ({ input }) {
        const {city} = input
        console.log("Que se trajo ", city);
        
        try {
            await connection.query(
              `INSERT INTO citys (ciudad)
                VALUES ( ?);`,
              [city]
            )
        } catch (e) {
            throw new Error('Error al crear movie')
        }
      
        const [cityFound] = await connection.query(
            `select * from citys where ciudad = ?;`,
            [city]
          )
          return cityFound
    }


    static async delete ({ ciudad }) {
        try {
         const removeCity = await connection.query(`DELETE FROM citys WHERE  ciudad =? `,[ciudad])
         console.log("Aca: ",removeCity);
         
        } catch (error) {
         console.log(`Error al eliminar la pelicula`);
        }
       }
     
       static async update ({ id, input }) {
         try {
           const uptMovie = await connection.query(`UPDATE movies
           SET
           title = "${input.title}",
           year = ${input.year},
           director = "${input.director}",
           duration = ${input.duration},
           poster ="${input.poster}",
           rate = ${input.rate}
           WHERE BIN_TO_UUID(id) = "${id}" ` ) 
           if (uptMovie) {
             const [res] = await connection.query(
               `select    title,year,director,duration,poster,rate,g.name from movie_genres mg
                               inner join movies m  on mg.movie_id = m.id
                               inner join genres g on mg.genre_id = g.id
                               where BIN_TO_UUID(movie_id) = ?;`,
               [id]
             )
             return res[0]
           }
     
          } catch (error ) {
           console.log(`Error al acturalizar la pelicula `+ error.message );
          }
         }
}