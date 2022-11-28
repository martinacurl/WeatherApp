import * as SQLite from "expo-sqlite";
import WeatherFavorite from "../entities/WeatherFavorite";

const db = SQLite.openDatabase("weatherlocations.db");

//initialize our database
export const initDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS weatherlocation(
            city STRING NOT NULL PRIMARY KEY,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL
        )`,
        [],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

// function to view tabell weatherlocation
export const getTableInfo = () => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        ` pragma table_info('weatherlocation')`,
        [],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

// function to insert to db weatherlocation.db
export const insert = (favorite) => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO weatherlocation(city, latitude, longitude) 
          VALUES (?,?,?)`,
        [favorite.city, favorite.latitude, favorite.longitude],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

// function to get all from DB
export const findAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM weatherlocation`,
        [],
        (_, res) =>
          resolve(
            res.rows._array.map(
              (row) =>
                new WeatherFavorite(row.city, row.latitude, row.longitude)
            )
          ),
        (_, err) => reject(err)
      );
    });
  });
};
