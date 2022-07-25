

export default str => `${str}-${new Date().getTime()}${String(Math.random()).slice(3,8)}`