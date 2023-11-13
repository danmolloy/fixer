import axios from "axios"

export default function AddUsers() {
  const handleClick = async() => {
    return axios.get('/api/hello')
          .then(response => {
            alert(JSON.stringify(response))
          })
          .catch(function (error) {
            console.log(error);
          });
  }
  return (
    <button onClick={() => handleClick()}>
      Add Users
    </button>
  )
}