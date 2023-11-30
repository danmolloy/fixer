
export const foo = (barFunc) => {
  console.log("This is foo")
  return barFunc()
}

export const bar = () => {
  console.log("This is bar")
}

export default async function handle(req, res) {


  res.status(200).json({result: "Hello"})
}