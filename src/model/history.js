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
        `SELECT account.account_display_name, account.account_adress, history.history_id, 
        history.history_subtotal, history.history_payment, history.history_status FROM history INNER JOIN 
        account ON history.account_id = account.account_id WHERE history_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryByAccountIdModel: (account_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE account_id = ${account_id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryTotalModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(history_subtotal) as total_all_sell FROM history',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryJoinModel: (account_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT  FROM history WHERE account_id = ${account_id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteHistoryModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM history WHERE history_id = ?',
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: id
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchHistoryModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE history SET ? WHERE history_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
