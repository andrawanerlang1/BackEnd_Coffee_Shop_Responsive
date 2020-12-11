const connection = require('../config/mysql')

module.exports = {
  //   getProductModel: (limit, offset) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         'SELECT * FROM product LIMIT ? OFFSET ?',
  //         [limit, offset],
  //         (error, result) => {
  //           !error ? resolve(result) : reject(new Error(error))
  //         }
  //       )
  //     })
  //   },
  //   getProductByNameModel: (productName, limit, offset) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         `SELECT * FROM product WHERE product_name LIKE '%${productName}%' LIMIT ${limit} OFFSET ${offset}`,
  //         (error, result) => {
  //           !error ? resolve(result) : reject(new Error(error))
  //         }
  //       )
  //     })
  //   },
  //   getProductByIdModel: (id) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         `SELECT * FROM product WHERE product_id = ${id}`, // bisa pakai template literall ==========================
  //         (error, result) => {
  //           !error ? resolve(result) : reject(new Error(error))
  //         }
  //       )
  //     })
  //   },
  //   getProductByCategoryModel: (category, limit, offset) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         'SELECT * FROM product WHERE category_id = ? LIMIT ? OFFSET ?',
  //         [category, limit, offset],
  //         (error, result) => {
  //           !error ? resolve(result) : reject(new Error(error))
  //         }
  //       )
  //     })
  //   },
  getOrderItemModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM order_item WHERE order_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postOrderItemModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO order_item SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
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
  postOrderModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO orders SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
  //   deleteProductModel: (id) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         'DELETE FROM product WHERE product_id = ?',
  //         id,
  //         (error, result) => {
  //           if (!error) {
  //             const newResult = {
  //               product_id: id
  //             }
  //             resolve(newResult)
  //           } else {
  //             reject(new Error(error))
  //           }
  //         }
  //       )
  //     })
  //   },
  //   deleteProductByNameModel: (productName) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         'DELETE FROM product WHERE product_name = ?',
  //         productName,
  //         (error, result) => {
  //           !error ? resolve(result) : reject(new Error(error))
  //         }
  //       )
  //     })
  //   },
  //   getProductCountModel: () => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         'SELECT COUNT(*) as total FROM product',
  //         (error, result) => {
  //           !error ? resolve(result[0].total) : reject(new Error(error))
  //         }
  //       )
  //     })
  //   },
  //   getProductNameCountModel: (productName) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         `SELECT COUNT(*) as total FROM product WHERE product_name LIKE '%${productName}%'`,
  //         (error, result) => {
  //           !error ? resolve(result[0].total) : reject(new Error(error))
  //         }
  //       )
  //     })
  //   },
  //   getProductCategoryCountModel: (category) => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         'SELECT COUNT(*) as total FROM product WHERE category_id = ?',
  //         category,
  //         (error, result) => {
  //           !error ? resolve(result[0].total) : reject(new Error(error))
  //         }
  //       )
  //     })
  //   }
}
