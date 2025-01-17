import axios from 'axios'

const baseUrl = '/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (content) => {
  const object = { content, votes: 0 }
  const res = await axios.post(baseUrl, object)
  return res.data
}

const update = async (id, object) => {
  const res = await axios.put(`${baseUrl}/${id}`, object)
  return res.data
}

export default { 
  getAll, 
  create,
  update,
}