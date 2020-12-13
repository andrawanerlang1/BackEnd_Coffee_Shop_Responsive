const connection = require('../config/mysql')

module.exports = {
  postHistoryModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO history SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getHistoryByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE history_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
