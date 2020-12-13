const connection = require('../config/mysql')

module.exports = {
  postHistoryDetailModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO history_detail SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              history_detail_id: result.insertId,
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
        `SELECT * FROM history_detail WHERE history_detail_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
