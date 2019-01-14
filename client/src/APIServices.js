export const getTasks = () => {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql'
        },
        body: `query{
            tasks{
                id
                name
                isDone
            }
        }`
    })
        .then(res => res.json())
        .catch(err => err)
}
export const editTask = (id, isDone) => {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql'
        },
        body: `mutation{
            edit(id:"${id.toString()}" , isDone:${isDone.toString()}){
              id
              name
              isDone
            }
          }`
    })
        .then(res => res.json())
        .catch(err => err)
}

export const deleteTask = (id) => {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql'
        },
        body: `mutation{
            delete(id:"${id.toString()}"){
              id
              name
              isDone
            }
          }`
    })
        .then(res => res.json())
        .catch(err => err)
}

export const addTask = (name) => {
    return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql'
        },
        body: `mutation{
            add(name:"${name.toString()}"){
              id
              name
              isDone
            }
          }`
    })
        .then(res => res.json())
        .catch(err => err)
}